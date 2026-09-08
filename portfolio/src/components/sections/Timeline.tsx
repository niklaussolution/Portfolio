import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { timeline, education, certifications } from '@/lib/site-content';
import { StatusBadge } from '@/components/ui/StatusBadge';

export function Timeline() {
  return (
    <section id="experience" className="border-b border-line py-28">
      <Container className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeader eyebrow="Experience" title="Career Timeline" />
          <div className="mt-12 space-y-0 border-l border-line-red pl-8">
            {timeline.map((role) => (
              <div key={role.role} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[calc(2rem+3px)] top-1.5 h-2 w-2 rounded-full bg-security-red" />
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-paper-muted">
                  {role.period}
                </p>
                <h3 className="mt-1 font-display text-2xl text-paper-white">{role.role}</h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-security-red">
                  {role.org}
                </p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-paper-muted">
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-security-red">Education</p>
          <div className="mt-6 space-y-6 border-t border-line pt-6">
            {education.map((e) => (
              <div key={e.degree}>
                <p className="font-display text-lg text-paper-white">{e.degree}</p>
                <p className="mt-1 text-sm text-paper-muted">{e.institution}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-security-red">
                  {e.status}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.2em] text-security-red">
            Certifications
          </p>
          <div className="mt-6 space-y-4 border-t border-line pt-6">
            {certifications.map((c) => (
              <div key={c.name} className="flex items-center justify-between">
                <div>
                  <p className="font-display text-lg text-paper-white">{c.name}</p>
                  <p className="text-xs text-paper-muted">{c.issuer}</p>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
