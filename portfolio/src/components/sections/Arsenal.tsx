import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { arsenal } from '@/lib/site-content';

export function Arsenal() {
  return (
    <section id="operations" className="border-b border-line py-28">
      <Container>
        <SectionHeader
          eyebrow="Security Console"
          title="Security Arsenal"
          description="Tooling and disciplines applied across offensive testing, monitoring and governance."
        />

        <div className="mt-16 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {arsenal.map((group) => (
            <div key={group.category} className="bg-ink-950 p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-security-red">
                {group.category}
              </p>
              <ul className="mt-6 space-y-3">
                {group.tools.map((tool) => (
                  <li key={tool} className="flex items-center gap-3 text-sm text-paper-white">
                    <span className="h-1 w-1 bg-line-red" aria-hidden />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
