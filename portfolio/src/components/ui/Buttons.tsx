'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function PrimaryButton({ href, children, className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 border border-security-red bg-security-red px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-paper-white transition-colors duration-300 hover:bg-transparent hover:text-security-red',
        className
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

export function OutlineButton({ href, children, className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 border border-line px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-paper-white transition-colors duration-300 hover:border-line-red hover:text-security-red',
        className
      )}
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
