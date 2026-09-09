import { Container } from '@/components/ui/Container';
import { TechnicalLabel } from '@/components/ui/TechnicalLabel';

export function Leadership() {
  return (
    <section className="border-b border-line py-28">
      <Container>
        <TechnicalLabel>Philosophy</TechnicalLabel>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-medium uppercase leading-[1.02] text-paper-white sm:text-5xl lg:text-6xl">
          Security is
          <br />
          a mindset.
        </h2>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-paper-muted sm:text-lg">
          Cybersecurity is not only tools — it is leadership, decision-making under uncertainty,
          risk framing, operations discipline, clear incident communication and a culture that
          takes security seriously long before an alert fires.
        </p>
      </Container>
    </section>
  );
}
