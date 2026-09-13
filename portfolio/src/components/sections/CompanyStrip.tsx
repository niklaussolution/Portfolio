import { Container } from '@/components/ui/Container';
import { OutlineButton } from '@/components/ui/Buttons';
import { profile } from '@/lib/site-content';

export function CompanyStrip() {
  return (
    <section className="border-b border-line py-20">
      <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-security-red">
            Director @
          </p>
          <h3 className="mt-2 font-display text-3xl text-paper-white sm:text-4xl">Niklaus Solutions</h3>
          <p className="mt-3 max-w-xl text-sm text-paper-muted">
            Cybersecurity · Technology Training · Security Research · Technical Education · Development
          </p>
        </div>
        <OutlineButton href={profile.companyUrl}>Visit Niklaus Solutions</OutlineButton>
      </Container>
    </section>
  );
}
