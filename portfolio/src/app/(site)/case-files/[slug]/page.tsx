import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { caseStudies } from '@/lib/site-content';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

function getCase(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    openGraph: { title: item.title, description: item.summary, type: 'article' },
  };
}

export default async function CaseFilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.title,
    description: item.summary,
    datePublished: item.date,
  };

  return (
    <article className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="border-b border-line bg-ink-900 pb-16 pt-32">
        <Container>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-security-red">
            Case File {item.caseId}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-medium uppercase leading-[1.02] text-paper-white sm:text-5xl lg:text-6xl">
            {item.title}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <StatusBadge status={item.status} />
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-paper-muted">
              {item.category}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-security-red">
              <AlertTriangle className="h-3.5 w-3.5" /> Severity: {item.severity}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-paper-muted">
              {item.date}
            </span>
          </div>
        </Container>
      </header>

      <Container className="grid gap-16 py-20 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-32 border-l-2 border-line-red pl-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-paper-white">
              Case File {item.caseId}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-paper-muted">
              Classification: Security Research
            </p>
          </div>
        </aside>

        <div className="space-y-16">
          <Section title="Executive Summary">
            <p>{item.summary}</p>
          </Section>

          <Section title="Incident Context">
            <p>{item.context}</p>
          </Section>

          <Section title="Technical Analysis">
            <ul className="space-y-3">
              {item.technicalAnalysis.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-security-red" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Indicators">
            <div className="grid gap-3 sm:grid-cols-2">
              {item.indicators.map((ind) => (
                <div key={ind} className="flex items-center gap-2 border border-line px-4 py-3 text-sm">
                  <ShieldAlert className="h-4 w-4 shrink-0 text-security-red" />
                  {ind}
                </div>
              ))}
            </div>
          </Section>

          <Section title="Investigation Process">
            <ol className="space-y-3">
              {item.process.map((step, i) => (
                <li key={step} className="flex items-center gap-4 font-mono text-sm uppercase tracking-[0.1em] text-paper-white">
                  <span className="text-security-red">{String(i + 1).padStart(2, '0')}</span>
                  {step}
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Impact">
            <p>{item.impact}</p>
          </Section>

          <Section title="Defense Recommendations">
            <ul className="space-y-3">
              {item.recommendations.map((r) => (
                <li key={r} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-security-red" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Tools Used">
            <div className="flex flex-wrap gap-2">
              {item.tools.map((t) => (
                <span key={t} className="border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-paper-muted">
                  {t}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Outcome">
            <p>{item.outcome}</p>
          </Section>

          <div className="border border-line-red bg-ink-900 p-6">
            <p className="text-xs leading-relaxed text-paper-muted">
              Technical case studies are presented for cybersecurity awareness, defensive research and
              educational purposes. Sensitive victim and investigation information is redacted. No
              individual is named or accused; findings describe application behavior only.
            </p>
          </div>
        </div>
      </Container>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-security-red">{title}</h2>
      <div className="mt-4 space-y-3 text-base leading-relaxed text-paper-muted">{children}</div>
    </section>
  );
}
