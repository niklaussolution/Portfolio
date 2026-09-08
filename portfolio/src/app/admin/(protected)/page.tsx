import { prisma } from '@/lib/prisma';

async function getCounts() {
  const [projects, cases, messages, incidents, awards, testimonials, media] = await Promise.all([
    prisma.project.count(),
    prisma.caseStudy.count({ where: { published: true } }),
    prisma.contactSubmission.count({ where: { status: 'NEW' } }),
    prisma.incidentSubmission.count({ where: { status: 'NEW' } }),
    prisma.award.count(),
    prisma.testimonial.count(),
    prisma.media.count(),
  ]);
  return { projects, cases, messages, incidents, awards, testimonials, media };
}

export default async function AdminOverview() {
  const counts = await getCounts();
  const cards = [
    { label: 'Total Projects', value: counts.projects },
    { label: 'Published Cases', value: counts.cases },
    { label: 'Pending Messages', value: counts.messages },
    { label: 'Incident Requests', value: counts.incidents },
    { label: 'Awards', value: counts.awards },
    { label: 'Testimonials', value: counts.testimonials },
    { label: 'Media Assets', value: counts.media },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-paper-white">Overview</h1>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="border border-line bg-ink-900 p-6">
            <p className="font-display text-3xl text-security-red">{c.value}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-paper-muted">
              {c.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
