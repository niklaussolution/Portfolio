'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let ringX = 0;
    let ringY = 0;

    const move = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      ringX = e.clientX;
      ringY = e.clientY;
    };

    let raf: number;
    const animateRing = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(animateRing);
    };
    raf = requestAnimationFrame(animateRing);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor-hover]');
      ringRef.current?.classList.toggle('scale-[1.8]', Boolean(interactive));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block" aria-hidden>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-security-red"
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 transition-transform duration-200 ease-out"
      />
    </div>
  );
}
