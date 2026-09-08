import Link from 'next/link';
import { HGMark } from '@/components/ui/HGMark';

export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center bg-ink-950 px-6 text-center">
      <HGMark className="h-10 w-10" />
      <p className="mt-8 font-display text-8xl text-outline sm:text-9xl">404</p>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-security-red">
        Target Not Found
      </p>
      <p className="mt-3 max-w-md text-sm text-paper-muted">
        The requested endpoint does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 border border-security-red px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper-white transition-colors hover:bg-security-red"
      >
        Return to Secure Zone
      </Link>
    </div>
  );
}
