'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { getStoredCreator, storeCreator } from '@/lib/session';
import type { User } from '@/lib/types';

type FormState = {
  name: string;
  username: string;
  bio: string;
};

const initialForm: FormState = {
  name: '',
  username: '',
  bio: '',
};

export default function EditProfilePage() {
  const [creatorId, setCreatorId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const creator = getStoredCreator();
      if (!creator) {
        setLoading(false);
        return;
      }

      setCreatorId(creator.id);

      try {
        const profile = await apiFetch<User>(`/users/${creator.id}`);
        setForm({
          name: profile.name,
          username: profile.username,
          bio: profile.bio || '',
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load profile');
      } finally {
        setLoading(false);
      }
    }

    void loadProfile();
  }, []);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    const username = form.username.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');

    if (form.name.trim().length < 2 || username.length < 3) {
      setError('Name must be at least 2 characters and username must be at least 3 characters.');
      setSaving(false);
      return;
    }

    try {
      const payload = {
        name: form.name.trim(),
        username,
        bio: form.bio.trim(),
      };

      const profile = creatorId
        ? await apiFetch<User>(`/users/${creatorId}`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
          })
        : await apiFetch<User>('/users', {
            method: 'POST',
            body: JSON.stringify(payload),
          });

      storeCreator(profile);
      setCreatorId(profile.id);
      setMessage('Profile saved. Taking you to dashboard...');
      window.setTimeout(() => {
        window.location.href = '/dashboard';
      }, 700);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save profile');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="h-96 animate-pulse rounded-2xl border border-gray-200 bg-white shadow-md" />;
  }

  return (
    <section className="mx-auto grid max-w-3xl gap-6">
      <div className="grid gap-3">
        <p className="text-sm font-bold uppercase text-indigo-600">{creatorId ? 'Edit profile' : 'Create profile'}</p>
        <h1 className="text-4xl font-bold text-gray-950">Your creator storefront starts here</h1>
        <p className="text-base leading-7 text-gray-600">
          Keep it simple: a clear name, a memorable username, and a bio that tells customers how you help.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
        <label className="grid gap-2 text-sm font-semibold text-gray-800">
          Name
          <input
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            required
            className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-950 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            placeholder="Anika Sharma"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-gray-800">
          Username
          <input
            value={form.username}
            onChange={(event) => updateField('username', event.target.value)}
            required
            className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-950 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            placeholder="anika"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-gray-800">
          Bio
          <textarea
            value={form.bio}
            onChange={(event) => updateField('bio', event.target.value)}
            rows={5}
            className="resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-950 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            placeholder="I help early-stage founders sharpen positioning, pricing, and launch plans."
          />
        </label>

        {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p> : null}
        {message ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{message}</p> : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={saving}
            className="cursor-pointer rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none disabled:hover:bg-gray-300"
          >
            {saving ? 'Saving...' : 'Save Profile'}
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
