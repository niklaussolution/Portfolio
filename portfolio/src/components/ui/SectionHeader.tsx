import { TechnicalLabel } from './TechnicalLabel';
import { cn } from '@/lib/utils';

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      <TechnicalLabel>{eyebrow}</TechnicalLabel>
      <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] text-paper-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-paper-muted sm:text-lg">{description}</p>
      )}
    </div>
  );
}
