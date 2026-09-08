import { Container } from '@/components/ui/Container';
import { TechnicalLabel } from '@/components/ui/TechnicalLabel';
import { IncidentForm } from './IncidentForm';
import { incidentCategories } from '@/lib/site-content';

export function IncidentCTA() {
  return (
    <section id="incident" className="border-b border-line bg-ink-900 py-28">
      <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <TechnicalLabel>Assistance</TechnicalLabel>
          <h2 className="mt-4 font-display text-4xl font-medium uppercase leading-[1.02] text-paper-white sm:text-5xl">
            Victim of a
            <br />
            Cyber Attack?
          </h2>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-paper-muted">
            Technical guidance when you need clarity.
          </p>
          <p className="mt-6 text-base leading-relaxed text-paper-muted">
            If you believe your account, mobile device, website or digital identity has been
            compromised, I can help you understand the technical situation, preserve relevant
            information and identify appropriate next steps.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {incidentCategories.map((c) => (
              <span
                key={c}
                className="border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-paper-muted"
              >
                {c}
              </span>
            ))}
          </div>

          <p className="mt-8 border-l-2 border-line-red pl-4 text-xs leading-relaxed text-paper-muted">
            I do not replace police, legal counsel or official cybercrime authorities. For criminal
            incidents, victims should also report through appropriate official channels.
          </p>
        </div>

        <IncidentForm />
      </Container>
    </section>
  );
}
