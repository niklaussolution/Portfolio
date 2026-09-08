'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Required'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(10, 'Please write a bit more'),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [reference, setReference] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('failed');
      const data = await res.json();
      setReference(data.reference);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="border border-line-red bg-ink-950 p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-security-red">
          Message Received
        </p>
        <p className="mt-3 text-sm text-paper-muted">Secure request received. Reference ID:</p>
        <p className="mt-2 font-mono text-xl text-paper-white">{reference}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <label className="block">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-paper-muted">
          Name
        </span>
        <input {...register('name')} className="hg-input w-full border border-line bg-ink-950 px-4 py-3 text-sm text-paper-white focus:border-security-red focus:outline-none" />
        {errors.name && <span className="mt-1 block text-xs text-security-red">{errors.name.message}</span>}
      </label>
      <label className="block">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-paper-muted">
          Email
        </span>
        <input type="email" {...register('email')} className="hg-input w-full border border-line bg-ink-950 px-4 py-3 text-sm text-paper-white focus:border-security-red focus:outline-none" />
        {errors.email && <span className="mt-1 block text-xs text-security-red">{errors.email.message}</span>}
      </label>
      <label className="block">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-paper-muted">
          Message
        </span>
        <textarea rows={5} {...register('message')} className="hg-input w-full border border-line bg-ink-950 px-4 py-3 text-sm text-paper-white focus:border-security-red focus:outline-none" />
        {errors.message && <span className="mt-1 block text-xs text-security-red">{errors.message.message}</span>}
      </label>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="border border-security-red bg-security-red px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-paper-white transition-colors hover:bg-transparent hover:text-security-red disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'General Inquiry'}
      </button>
      {status === 'error' && <p className="text-xs text-security-red">Something went wrong. Please try again.</p>}
    </form>
  );
}
