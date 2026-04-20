'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { clearStoredCreator, getStoredCreator } from '@/lib/session';
import type { Booking, Service, User } from '@/lib/types';

type DashboardData = {
  profile: User | null;
  services: Service[];
  bookings: Booking[];
};

function formatBookingTime(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({ profile: null, services: [], bookings: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadDashboard() {
    const creator = getStoredCreator();
    if (!creator) {
      setData({ profile: null, services: [], bookings: [] });
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [profile, services, bookings] = await Promise.all([
        apiFetch<User>(`/users/${creator.id}`),
        apiFetch<Service[]>(`/services?userId=${creator.id}`),
        apiFetch<Booking[]>(`/bookings?userId=${creator.id}`),
      ]);

      setData({ profile, services, bookings });
    } catch (err) {
      clearStoredCreator();
      setError(err instanceof Error ? err.message : 'Unable to load dashboard');
      setData({ profile: null, services: [], bookings: [] });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="grid animate-pulse gap-8">
        <div className="h-44 rounded-2xl border border-gray-200 bg-white shadow-md" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-64 rounded-2xl border border-gray-200 bg-white shadow-md" />
          <div className="h-64 rounded-2xl border border-gray-200 bg-white shadow-md" />
        </div>
      </div>
    );
  }

  if (!data.profile) {
    return (
      <section className="grid gap-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md md:p-10">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="grid gap-3">
              <p className="text-sm font-bold uppercase text-indigo-600">Creator dashboard</p>
              <h1 className="text-4xl font-bold text-gray-950">Create your Winzx profile</h1>
              <p className="max-w-2xl text-base leading-7 text-gray-600">
                Add your name, username, and bio. Then you can publish services and share your public profile.
              </p>
              {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}
            </div>
            <Link
              href="/dashboard/profile"
              className="cursor-pointer rounded-2xl bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
            >
              Create Profile
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {['Create profile', 'Add your services', 'Start receiving bookings'].map((item, index) => (
            <div key={item} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 font-bold text-indigo-600">
                {index + 1}
              </div>
              <h2 className="mt-5 text-lg font-bold text-gray-950">{item}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">This step becomes live as soon as your data is saved.</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="grid gap-8">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-8">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-emerald-500 text-3xl font-bold text-white shadow-md">
              {data.profile.name.charAt(0).toUpperCase()}
            </div>
            <div className="grid gap-2">
              <p className="text-sm font-bold uppercase text-indigo-600">Profile info</p>
              <h1 className="text-4xl font-bold text-gray-950">{data.profile.name}</h1>
              <p className="font-medium text-indigo-600">@{data.profile.username}</p>
              <p className="max-w-2xl text-sm leading-6 text-gray-600">
                {data.profile.bio || 'No bio yet. Add a short promise for the customers who visit your profile.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <a
              href={`/profile/${data.profile.username}`}
              className="cursor-pointer rounded-2xl bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
            >
              View Public Profile
            </a>
            <Link
              href="/dashboard/profile"
              className="cursor-pointer rounded-2xl border border-indigo-200 bg-white px-5 py-3 text-center text-sm font-semibold text-indigo-700 shadow-sm transition-all duration-200 hover:border-indigo-700 hover:bg-indigo-700 hover:text-white active:scale-95"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="grid gap-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase text-indigo-600">My services</p>
              <h2 className="mt-1 text-2xl font-bold text-gray-950">Offers customers can book</h2>
            </div>
            <Link
              href="/dashboard/services/new"
              className="cursor-pointer rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
            >
              Add Service
            </Link>
          </div>

          {data.services.length > 0 ? (
            <div className="grid gap-4">
              {data.services.map((service) => (
                <article
                  key={service.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-950">{service.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-600">{service.description}</p>
                    </div>
                    <p className="shrink-0 text-2xl font-bold text-gray-950">₹{service.price}</p>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-gray-500">{service.durationMinutes} mins</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-md">
              <h3 className="text-xl font-bold text-gray-950">No services yet</h3>
              <p className="mt-2 text-sm text-gray-600">Create your first bookable service to make your profile useful.</p>
              <Link
                href="/dashboard/services/new"
                className="mt-5 inline-flex cursor-pointer rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
              >
                Add Service
              </Link>
            </div>
          )}
        </section>

        <section className="grid content-start gap-5">
          <div>
            <p className="text-sm font-bold uppercase text-indigo-600">My bookings</p>
            <h2 className="mt-1 text-2xl font-bold text-gray-950">Upcoming sessions</h2>
          </div>

          {data.bookings.length > 0 ? (
            <div className="grid gap-4">
              {data.bookings.map((booking) => (
                <article
                  key={booking.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-gray-950">{booking.service?.title || 'Booked service'}</h3>
                      <p className="mt-2 text-sm text-gray-600">{formatBookingTime(booking.timeSlot)}</p>
                      {booking.user ? <p className="mt-1 text-xs font-medium text-gray-500">Booked by {booking.user.name}</p> : null}
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold capitalize text-emerald-700">
                      {booking.status}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-md">
              <h3 className="text-xl font-bold text-gray-950">No bookings yet</h3>
              <p className="mt-2 text-sm text-gray-600">Bookings will appear here after customers confirm a session.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
