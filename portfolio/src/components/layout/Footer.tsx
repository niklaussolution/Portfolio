import Link from 'next/link';
import { profile } from '@/lib/site-content';

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-950">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:px-16">
        <p className="font-display text-2xl text-paper-white">HARISH GANESAN</p>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-security-red">
          Secure. Analyze. Defend. Evolve.
        </p>
        <p className="mt-1 text-sm text-paper-muted">Director @ {profile.company}</p>

        <div className="mt-8 flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-[0.15em] text-paper-muted">
          <Link href={profile.socials.linkedin} className="hover:text-paper-white">LinkedIn</Link>
          <Link href={profile.socials.github} className="hover:text-paper-white">GitHub</Link>
          <Link href={profile.socials.instagram} className="hover:text-paper-white">Instagram</Link>
          <Link href={profile.companyUrl} className="hover:text-paper-white">Niklaus Solutions</Link>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-paper-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Harish Ganesan.</span>
          <span>Engineered with security in mind.</span>
        </div>
      </div>
    </footer>
  );
}
