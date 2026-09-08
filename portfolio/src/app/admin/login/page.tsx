'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { HGMark } from '@/components/ui/HGMark';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError('Invalid credentials.');
      return;
    }
    router.push('/admin');
  };

  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-ink-950 px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center">
          <HGMark className="h-10 w-10" />
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-security-red">
            Admin Access
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-line bg-ink-900 px-4 py-3 text-sm text-paper-white focus:border-security-red focus:outline-none"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-line bg-ink-900 px-4 py-3 text-sm text-paper-white focus:border-security-red focus:outline-none"
          />
          {error && <p className="text-xs text-security-red">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full border border-security-red bg-security-red py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper-white transition-colors hover:bg-transparent hover:text-security-red disabled:opacity-50"
          >
            {loading ? 'Verifying…' : 'Secure Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
