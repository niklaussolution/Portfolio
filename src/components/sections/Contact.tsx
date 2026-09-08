import { Container } from '@/components/ui/Container';
import { ContactForm } from './ContactForm';
import { profile } from '@/lib/site-content';

export function Contact() {
  return (
    <section id="contact" className="py-28">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-display text-5xl font-medium uppercase leading-[0.98] text-paper-white sm:text-6xl">
            Let&apos;s Build
            <br />
            A Safer Digital
            <br />
            World.
          </h2>
          <div className="mt-10 space-y-1 text-sm text-paper-muted">
            <p className="font-display text-lg text-paper-white">{profile.name}</p>
            <p>{profile.location}</p>
            <p>{profile.email}</p>
          </div>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
