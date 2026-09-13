import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { TechnicalLabel } from '@/components/ui/TechnicalLabel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PrimaryButton } from '@/components/ui/Buttons';
import { caseStudies } from '@/lib/site-content';
import { ArrowUpRight } from 'lucide-react';

export function FeaturedCase() {
  const featured = caseStudies[0];
  return (
    <section id="case-files" className="border-b border-line bg-ink-900 py-28">
      <Container>
        <TechnicalLabel>Cyber Investigations</TechnicalLabel>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-medium uppercase leading-[1.02] text-paper-white sm:text-5xl">
          From Digital Evidence
          <br />
          to Actionable Intelligence
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper-muted sm:text-lg">
          I analyze suspicious digital activity, malicious applications, phishing attempts, scam
          infrastructure and cybersecurity incidents — and document the findings for awareness and
          defense.
        </p>

        <div className="mt-16 grid gap-px border border-line bg-line lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col justify-between bg-ink-950 p-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">Case ID</p>
              <p className="mt-1 font-mono text-lg text-security-red">{featured.caseId}</p>

              <div className="mt-8 space-y-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">Category</p>
                  <p className="mt-1 text-sm text-paper-white">{featured.category}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">Severity</p>
                  <p className="mt-1 text-sm text-security-red">{featured.severity}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">Status</p>
                  <StatusBadge status={featured.status} />
                </div>
              </div>
            </div>

            <PrimaryButton href={`/case-files/${featured.slug}`} className="mt-10 w-fit">
              Open Case File
            </PrimaryButton>
          </div>

          <div className="bg-ink-950 p-10">
            <h3 className="font-display text-2xl text-paper-white">{featured.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-paper-muted">{featured.summary}</p>
            <ol className="mt-8 space-y-2">
              {featured.process.map((step, i) => (
                <li key={step} className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.1em] text-paper-muted">
                  <span className="text-security-red">{String(i + 1).padStart(2, '0')}</span>
                  {step}
                  {i < featured.process.length - 1 && (
                    <ArrowUpRight className="h-3 w-3 rotate-90 text-line" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-paper-muted">
          Technical case studies are presented for cybersecurity awareness, defensive research and
          educational purposes. Sensitive victim and investigation information is redacted.
        </p>

        <Link
          href={`/case-files/${featured.slug}`}
          className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.15em] text-paper-muted underline decoration-line-red underline-offset-4 hover:text-paper-white"
        >
          View Full Case File
        </Link>
      </Container>
    </section>
  );
}
