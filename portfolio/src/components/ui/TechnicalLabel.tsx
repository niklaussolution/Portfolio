import { cn } from '@/lib/utils';

export function TechnicalLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-security-red',
        className
      )}
    >
      <span className="h-1.5 w-1.5 bg-security-red" aria-hidden />
      {children}
    </span>
  );
}
