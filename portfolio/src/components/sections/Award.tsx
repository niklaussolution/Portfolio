import { Container } from '@/components/ui/Container';
import { TechnicalLabel } from '@/components/ui/TechnicalLabel';
import { award, additionalAchievements } from '@/lib/site-content';
import { ShieldCheck } from 'lucide-react';

export function Award() {
  return (
    <section id="awards" className="relative overflow-hidden border-b border-line py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-security-red/10 blur-[140px]" aria-hidden />
      <Container className="relative">
        <TechnicalLabel>Recognition</TechnicalLabel>
        <div className="mt-8 grid gap-12 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="flex h-40 w-40 items-center justify-center border border-line-red">
            <ShieldCheck className="h-16 w-16 text-security-red" strokeWidth={1.25} />
          </div>
          <div>
            <h2 className="font-display text-4xl font-medium uppercase leading-[1.02] text-paper-white sm:text-5xl lg:text-6xl">
              {award.title}
            </h2>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-paper-muted">
              {award.issuer}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper-muted">
              {award.description}
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-3">
          {additionalAchievements.map((a) => (
            <div key={a.title} className="bg-ink-950 p-6">
              <p className="text-sm text-paper-white">{a.title}</p>
              {a.issuer && (
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-paper-muted">
                  {a.issuer}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
