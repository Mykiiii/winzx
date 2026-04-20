'use client';

import { FormEvent, useState } from 'react';
import { apiFetch } from '@/lib/api';

type BookingPayload = {
  userId: string;
  serviceId: string;
  timeSlot: string;
};

export default function BookPage({ params }: { params: { serviceId: string } }) {
  const [buyerId, setBuyerId] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Submitting...');

    const payload: BookingPayload = {
      userId: buyerId,
      serviceId: params.serviceId,
      timeSlot,
    };

    try {
      await apiFetch('/bookings', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setStatus('Booking created successfully.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Booking failed');
    }
  }

  return (
    <section className="mx-auto grid max-w-2xl gap-6">
      <div className="grid gap-3">
        <p className="text-sm font-bold uppercase text-indigo-600">Booking</p>
        <h1 className="text-4xl font-bold text-gray-950">Confirm your session</h1>
        <p className="text-base leading-7 text-gray-600">
          Choose the buyer account and time slot for this service.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
        <label className="grid gap-2 text-sm font-semibold text-gray-800">
          Buyer user ID
          <input
            value={buyerId}
            onChange={(e) => setBuyerId(e.target.value)}
            required
            className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-950 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            placeholder="cuid..."
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-gray-800">
          Time slot
          <input
            type="datetime-local"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
            className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-950 outline-none transition-all duration-200 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
        </label>

        <button
          type="submit"
          className="cursor-pointer rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
        >
          Confirm booking
        </button>
      </form>

      {status ? (
        <p className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-md">
          {status}
        </p>
      ) : null}
    </section>
  );
}
