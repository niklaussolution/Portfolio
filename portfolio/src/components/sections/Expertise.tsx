import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { expertise } from '@/lib/site-content';
import { Radar } from 'lucide-react';

export function Expertise() {
  return (
    <section id="expertise" className="border-b border-line py-28">
      <Container>
        <SectionHeader
          eyebrow="Capability"
          title="Areas of Expertise"
          description="A cross-section of offensive, defensive and investigative security disciplines."
        />

        <div className="mt-16 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map((item) => (
            <div
              key={item.index}
              className="group relative bg-ink-950 p-8 transition-colors duration-300 hover:bg-ink-900"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-paper-muted">{item.index}</span>
                <Radar className="h-4 w-4 text-line-red opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <h3 className="mt-6 font-display text-xl text-paper-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-muted">{item.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-paper-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-security-red transition-transform duration-300 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
