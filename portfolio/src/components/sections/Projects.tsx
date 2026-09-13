import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { projects } from '@/lib/site-content';
import { ArrowUpRight } from 'lucide-react';

export function Projects() {
  return (
    <section className="border-b border-line py-28">
      <Container>
        <SectionHeader eyebrow="Build" title="Projects" />
        <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2">
          {projects.map((project) => (
            <div key={project.slug} className="group bg-ink-950 p-10">
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-security-red">
                  {project.category}
                </span>
                <ArrowUpRight className="h-4 w-4 text-paper-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-security-red" />
              </div>
              <h3 className="mt-6 font-display text-2xl text-paper-white">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-muted">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-paper-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
