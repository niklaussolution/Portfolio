import { cn } from '@/lib/utils';

const STATUS_STYLES: Record<string, string> = {
  ANALYZED: 'border-line-red text-security-red',
  DOCUMENTED: 'border-line text-paper-muted',
  MITIGATED: 'border-emerald-900 text-emerald-400',
  RESEARCH: 'border-line text-paper-muted',
  VERIFIED: 'border-emerald-900 text-emerald-400',
  'IN PROGRESS': 'border-line-red text-security-red',
  EXPIRED: 'border-line text-paper-muted',
  RENEWING: 'border-line text-paper-muted',
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const normalized = status.toUpperCase();
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em]',
        STATUS_STYLES[normalized] ?? 'border-line text-paper-muted',
        className
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {status}
    </span>
  );
}
