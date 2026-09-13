'use client';

import { useEffect, useRef, useState } from 'react';

export function StatCounter({ value, label, draft }: { value: string; label: string; draft?: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState(draft ? value : '0');

  useEffect(() => {
    if (draft || !ref.current) return;
    const numeric = parseInt(value.replace(/\D/g, ''), 10);
    if (Number.isNaN(numeric)) {
      setDisplay(value);
      return;
    }
    const suffix = value.replace(/[0-9]/g, '');
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const duration = 1200;
        const step = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          setDisplay(Math.round(progress * numeric) + suffix);
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, draft]);

  return (
    <div className="border border-line p-8">
      <p ref={ref} className="font-display text-4xl text-security-red sm:text-5xl">
        {display}
      </p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-paper-muted">
        {label}
        {draft && ' (draft)'}
      </p>
    </div>
  );
}
