'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { incidentCategories } from '@/lib/site-content';

const schema = z.object({
  fullName: z.string().min(2, 'Required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(6, 'Required'),
  category: z.string().min(1, 'Select a category'),
  incidentDate: z.string().optional(),
  platform: z.string().optional(),
  description: z.string().min(20, 'Please provide more detail (min 20 characters)'),
  financialLoss: z.enum(['yes', 'no']),
  urgency: z.enum(['low', 'medium', 'high']),
  preferredContact: z.enum(['email', 'phone']),
  consent: z.literal(true, { errorMap: () => ({ message: 'Consent is required' }) }),
});

type FormValues = z.infer<typeof schema>;

export function IncidentForm() {
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
      const res = await fetch('/api/incident', {
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
      <div className="border border-line-red bg-ink-900 p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-security-red">
          Security Request Received
        </p>
        <p className="mt-3 text-sm text-paper-muted">Secure request received. Case reference generated:</p>
        <p className="mt-2 font-mono text-xl text-paper-white">{reference}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" error={errors.fullName?.message}>
          <input {...register('fullName')} className="hg-input" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input type="email" {...register('email')} className="hg-input" />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input {...register('phone')} className="hg-input" />
        </Field>
        <Field label="Incident Category" error={errors.category?.message}>
          <select {...register('category')} className="hg-input" defaultValue="">
            <option value="" disabled>
              Select category
            </option>
            {incidentCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Incident Date">
          <input type="date" {...register('incidentDate')} className="hg-input" />
        </Field>
        <Field label="Platform / Device">
          <input {...register('platform')} className="hg-input" placeholder="e.g. Android, WhatsApp" />
        </Field>
      </div>

      <Field label="Description" error={errors.description?.message}>
        <textarea {...register('description')} rows={5} className="hg-input" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Financial Loss?">
          <select {...register('financialLoss')} className="hg-input" defaultValue="no">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </Field>
        <Field label="Urgency">
          <select {...register('urgency')} className="hg-input" defaultValue="medium">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </Field>
        <Field label="Preferred Contact">
          <select {...register('preferredContact')} className="hg-input" defaultValue="email">
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </Field>
      </div>

      <label className="flex items-start gap-3 text-xs text-paper-muted">
        <input type="checkbox" {...register('consent')} className="mt-1" />
        I consent to Harish Ganesan / Niklaus Solutions reviewing this submission for the purpose of
        technical security assistance. I understand this is not a substitute for police, legal counsel
        or official cybercrime authorities.
      </label>
      {errors.consent && <p className="text-xs text-security-red">{errors.consent.message}</p>}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="border border-security-red bg-security-red px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-paper-white transition-colors hover:bg-transparent hover:text-security-red disabled:opacity-50"
      >
        {status === 'submitting' ? 'Submitting…' : 'Request Security Assistance'}
      </button>
      {status === 'error' && (
        <p className="text-xs text-security-red">Something went wrong. Please try again.</p>
      )}

      <style jsx>{`
        :global(.hg-input) {
          width: 100%;
          background: #0d0d0d;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: #f3f3f3;
        }
        :global(.hg-input:focus) {
          outline: none;
          border-color: #e10600;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.15em] text-paper-muted">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-security-red">{error}</span>}
    </label>
  );
}
