'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Container } from '@/components/ui/Container';
import { PrimaryButton, OutlineButton } from '@/components/ui/Buttons';
import { profile } from '@/lib/site-content';

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-line]', {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        delay: 0.3,
      });
      gsap.from('[data-hero-fade]', {
        opacity: 0,
        y: 16,
        duration: 0.9,
        stagger: 0.1,
        delay: 0.9,
        ease: 'power2.out',
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="noise-overlay" aria-hidden />
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-security-red/10 blur-[160px]" aria-hidden />

      <Container className="relative grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p data-hero-fade className="font-mono text-xs uppercase tracking-[0.25em] text-security-red">
            {profile.heroEyebrow}
          </p>

          <h1 className="mt-6 font-display text-[16vw] font-medium uppercase leading-[0.88] text-paper-white sm:text-[9vw] lg:text-[6.2vw]">
            <span className="block overflow-hidden">
              <span data-hero-line className="block">Harish</span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block text-outline">Ganesan</span>
            </span>
          </h1>

          <p data-hero-fade className="mt-8 font-mono text-sm uppercase tracking-[0.15em] text-paper-white">
            {profile.title} @ {profile.company}
          </p>
          <p data-hero-fade className="mt-2 text-sm text-paper-muted">
            Ethical Hacker • Security Operations • Threat Investigation
            <br />
            Cybersecurity Professional with {profile.experienceYears} years of experience.
          </p>
          <p data-hero-fade className="mt-6 max-w-xl text-base leading-relaxed text-paper-muted sm:text-lg">
            {profile.heroStatement}
          </p>

          <div data-hero-fade className="mt-10 flex flex-wrap gap-4">
            <PrimaryButton href="#expertise">Explore My Work</PrimaryButton>
            <OutlineButton href="#contact">Report a Cyber Incident</OutlineButton>
          </div>

          <div data-hero-fade className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">Location</p>
              <p className="mt-1 font-mono text-xs uppercase text-paper-white">Erode • India</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">Focus</p>
              <p className="mt-1 font-mono text-xs uppercase text-paper-white">Cybersecurity</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">Status</p>
              <p className="mt-1 flex items-center gap-1.5 font-mono text-xs uppercase text-security-red">
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-security-red" />
                Active
              </p>
            </div>
          </div>
        </div>

        <div data-hero-fade className="relative mx-auto aspect-[3/4] w-full max-w-[420px]">
          <div className="absolute -inset-6 border border-line-red" aria-hidden />
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden border border-line bg-ink-900">
            <span className="font-display text-[7vw] leading-none text-outline lg:text-6xl">HG</span>
            <div className="absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-security-red/20 to-transparent" aria-hidden />
            <p className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-muted">
              Portrait — pending admin upload
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
