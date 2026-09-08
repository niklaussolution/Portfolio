'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { HGMark } from '@/components/ui/HGMark';
import { profile } from '@/lib/site-content';

const LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Expertise', href: '/#expertise' },
  { label: 'Operations', href: '/#operations' },
  { label: 'Case Files', href: '/#case-files' },
  { label: 'Awards', href: '/#awards' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ink-950/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-3" aria-label="Harish Ganesan home">
          <HGMark />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper-white">HG</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.15em] text-paper-muted transition-colors hover:text-paper-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-paper-muted">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-security-red" />
            STATUS: {profile.availability}
          </span>
          <Link
            href="/#contact"
            className="border border-security-red px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-paper-white transition-colors hover:bg-security-red"
          >
            Secure Contact
          </Link>
        </div>

        <button
          className="p-2 text-paper-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-20 z-40 flex flex-col justify-between bg-ink-950 p-8 lg:hidden">
          <nav className="flex flex-col gap-6" aria-label="Mobile">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-paper-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="border border-security-red px-4 py-4 text-center font-mono text-xs uppercase tracking-[0.15em] text-paper-white"
          >
            Secure Contact
          </Link>
        </div>
      )}
    </header>
  );
}
