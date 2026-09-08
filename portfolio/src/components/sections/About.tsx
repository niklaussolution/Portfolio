import { Container } from '@/components/ui/Container';
import { TechnicalLabel } from '@/components/ui/TechnicalLabel';
import { aboutCards, profile } from '@/lib/site-content';

export function About() {
  return (
    <section id="about" className="border-b border-line py-28">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <TechnicalLabel>Identity</TechnicalLabel>
          <h2 className="mt-4 font-display text-4xl font-medium uppercase leading-[1.02] text-paper-white sm:text-5xl">
            Who is
            <br />
            Harish Ganesan?
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-paper-muted sm:text-lg">
            {profile.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-2">
          {aboutCards.map((card) => (
            <div key={card.label} className="bg-ink-950 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-security-red">
                {card.label}
              </p>
              <p className="mt-2 font-display text-lg text-paper-white">{card.value}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
