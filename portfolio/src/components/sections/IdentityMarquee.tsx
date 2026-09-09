import { identityStrip } from '@/lib/site-content';

export function IdentityMarquee() {
  const items = [...identityStrip, ...identityStrip];
  return (
    <div className="overflow-hidden border-y border-line bg-ink-900 py-4">
      <div className="flex w-max animate-marquee gap-8">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-paper-muted"
          >
            {item}
            <span className="text-security-red">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
