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
    <section className="max-w-xl space-y-6">
      <h1 className="text-3xl font-bold">Book this service</h1>
      <p className="text-sm text-slate-600">
        This MVP form uses a buyer user ID directly. In the next iteration, this will come from authenticated session.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
        <label className="block text-sm font-medium">
          Buyer user ID
          <input
            value={buyerId}
            onChange={(e) => setBuyerId(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            placeholder="cuid..."
          />
        </label>

        <label className="block text-sm font-medium">
          Time slot
          <input
            type="datetime-local"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </label>

        <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">
          Confirm booking
        </button>
      </form>

      {status ? <p className="text-sm text-slate-700">{status}</p> : null}
    </section>
  );
}
