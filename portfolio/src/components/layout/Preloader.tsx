'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const STAGES = [
  'INITIALIZING SECURE SESSION',
  'VERIFYING SYSTEM...',
  'LOADING SECURITY PROFILE...',
  'ESTABLISHING ENCRYPTED INTERFACE...',
];

export function Preloader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [verified, setVerified] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('hg-preloader-shown');
    if (alreadyShown) return;

    setVisible(true);
    document.body.style.overflow = 'hidden';

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 300 : 2800;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      setStageIndex(Math.min(STAGES.length - 1, Math.floor((pct / 100) * STAGES.length)));
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setVerified(true);
        setTimeout(() => {
          sessionStorage.setItem('hg-preloader-shown', '1');
          if (rootRef.current && !reduced) {
            gsap.to(rootRef.current, {
              yPercent: -100,
              duration: 0.9,
              ease: 'power4.inOut',
              onComplete: () => {
                setVisible(false);
                document.body.style.overflow = '';
              },
            });
          } else {
            setVisible(false);
            document.body.style.overflow = '';
          }
        }, 500);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
      role="status"
      aria-live="polite"
    >
      <div className="w-[min(420px,80vw)] text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper-muted">
          {verified ? 'ACCESS GRANTED' : STAGES[stageIndex]}
        </p>
        <div className="mt-6 h-px w-full bg-line">
          <div
            className="h-px bg-security-red transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 font-mono text-2xl text-security-red">{String(progress).padStart(2, '0')}%</p>
        {verified && (
          <div className="mt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper-muted">
              IDENTITY VERIFIED
            </p>
            <p className="mt-2 font-display text-xl text-paper-white">HARISH GANESAN</p>
          </div>
        )}
      </div>
    </div>
  );
}
