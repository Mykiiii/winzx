'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { getStoredCreator } from '@/lib/session';
import type { Service } from '@/lib/types';

type FormState = {
  title: string;
  description: string;
  price: string;
  durationMinutes: string;
};

const initialForm: FormState = {
  title: '',
  description: '',
  price: '',
  durationMinutes: '30',
};

export default function NewServicePage() {
  const [creatorId, setCreatorId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [saving, setSaving] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const creator = getStoredCreator();
    setCreatorId(creator?.id || null);
    setReady(true);
  }, []);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!creatorId) return;

    setSaving(true);
    setError(null);
    setMessage(null);

    const price = Number(form.price);
    const durationMinutes = Number(form.durationMinutes);

    if (!form.title.trim() || !form.description.trim() || price < 0 || durationMinutes < 15) {
      setError('Add a title, description, valid price, and at least 15 minutes duration.');
      setSaving(false);
      return;
    }

    try {
      await apiFetch<Service>('/services', {
        method: 'POST',
        body: JSON.stringify({
          userId: creatorId,
          title: form.title.trim(),
          description: form.description.trim(),
          price,
          durationMinutes,
        }),
      });

      setMessage('Service created. Taking you back to dashboard...');
      window.setTimeout(() => {
        window.location.href = '/dashboard';
      }, 700);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create service');
    } finally {
      setSaving(false);
    }
  }

  if (!ready) {
    return <div className="h-96 animate-pulse rounded-2xl border border-gray-200 bg-white shadow-md" />;
  }

  if (!creatorId) {
    return (
      <section className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-md">
        <h1 className="text-3xl font-bold text-gray-950">Create your profile first</h1>
        <p className="mt-3 text-sm leading-6 text-gray-600">Services need a creator profile before they can be published.</p>
        <Link
          href="/dashboard/profile"
          className="mt-6 inline-flex cursor-pointer rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
        >
          Create Profile
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto grid max-w-3xl gap-6">
      <div className="grid gap-3">
        <p className="text-sm font-bold uppercase text-indigo-600">New service</p>
        <h1 className="text-4xl font-bold text-gray-950">Package your expertise</h1>
        <p className="text-base leading-7 text-gray-600">
          Create a focused offer customers can understand quickly and book with confidence.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
        <label className="grid gap-2 text-sm font-semibold text-gray-800">
          Title
          <input
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
            required
            className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-950 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            placeholder="1:1 Mentorship Call"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-gray-800">
          Description
          <textarea
            value={form.description}
            onChange={(event) => updateField('description', event.target.value)}
            rows={5}
            required
            className="resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-950 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            placeholder="A focused session to solve one specific problem and leave with a clear next step."
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-gray-800">
            Price
            <input
              type="number"
              min="0"
              value={form.price}
              onChange={(event) => updateField('price', event.target.value)}
              required
              className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-950 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              placeholder="999"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-gray-800">
            Duration
            <input
              type="number"
              min="15"
              step="15"
              value={form.durationMinutes}
              onChange={(event) => updateField('durationMinutes', event.target.value)}
              required
              className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-950 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              placeholder="30"
            />
          </label>
        </div>

        {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p> : null}
        {message ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{message}</p> : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={saving}
            className="cursor-pointer rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none disabled:hover:bg-gray-300"
          >
            {saving ? 'Creating...' : 'Create Service'}
          </button>
          <Link
            href="/dashboard"
            className="cursor-pointer rounded-2xl border border-indigo-200 bg-white px-5 py-3 text-center font-semibold text-indigo-700 shadow-sm transition-all duration-200 hover:border-indigo-700 hover:bg-indigo-700 hover:text-white active:scale-95"
          >
            Back to Dashboard
          </Link>
        </div>
      </form>
    </section>
  );
}
