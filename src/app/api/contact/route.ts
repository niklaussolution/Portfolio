import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { rateLimit, reference } from '@/lib/rate-limit';

const schema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const limited = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: 'Too many requests. Try again shortly.' }, { status: 429 });
  }

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  }

  const ref = reference('HG');
  await prisma.contactSubmission.create({
    data: { ...parsed.data, reference: ref, ip },
  });

  return NextResponse.json({ reference: ref });
}
