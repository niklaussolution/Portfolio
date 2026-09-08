import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { rateLimit, reference } from '@/lib/rate-limit';

const schema = z.object({
  fullName: z.string().min(2).max(200),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  category: z.string().min(1).max(100),
  incidentDate: z.string().optional(),
  platform: z.string().max(200).optional(),
  description: z.string().min(20).max(8000),
  financialLoss: z.enum(['yes', 'no']),
  urgency: z.enum(['low', 'medium', 'high']),
  preferredContact: z.enum(['email', 'phone']),
  consent: z.literal(true),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const limited = rateLimit(`incident:${ip}`, 3, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: 'Too many requests. Try again shortly.' }, { status: 429 });
  }

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  }

  const { incidentDate, consent: _consent, ...rest } = parsed.data;
  const ref = reference('HG-INC');

  await prisma.incidentSubmission.create({
    data: {
      ...rest,
      incidentDate: incidentDate ? new Date(incidentDate) : undefined,
      financialLoss: rest.financialLoss === 'yes',
      reference: ref,
      ip,
    },
  });

  return NextResponse.json({ reference: ref });
}
