'use client';

import { useState } from 'react';
import { apiFetch } from '@/lib/api';
import { getStoredCustomer, storeCustomer } from '@/lib/session';
import type { Booking, User } from '@/lib/types';

type BookingModalProps = {
  service: {
    id: string;
    title: string;
    price: number;
    durationMinutes: number;
  };
  creator?: User;
  isOpen: boolean;
  onClose: () => void;
};

const timeSlots = ['10:00 AM', '2:00 PM', '6:00 PM'];

function slotToIso(slot: string) {
  const [time, period] = slot.split(' ');
  const [rawHour, rawMinute] = time.split(':').map(Number);
  let hour = rawHour;

  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;

  const date = new Date();
  date.setHours(hour, rawMinute, 0, 0);

  if (date.getTime() < Date.now()) {
    date.setDate(date.getDate() + 1);
  }

  return date.toISOString();
}

async function getOrCreateCustomer() {
  const stored = getStoredCustomer();
  if (stored) return stored;

  const suffix = Math.random().toString(36).slice(2, 8);
  const customer = await apiFetch<User>('/users', {
    method: 'POST',
    body: JSON.stringify({
      name: 'Guest Customer',
      username: `guest-${suffix}`,
      bio: 'Customer account created from the booking flow.',
    }),
  });

  storeCustomer(customer);
  return { id: customer.id, username: customer.username };
}

export function BookingModal({ service, creator, isOpen, onClose }: BookingModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function confirmBooking() {
    if (!selectedSlot) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const customer = await getOrCreateCustomer();
      const booking = await apiFetch<Booking>('/bookings', {
        method: 'POST',
        body: JSON.stringify({
          userId: customer.id,
          serviceId: service.id,
          time: slotToIso(selectedSlot),
        }),
      });

      setSuccess(`Booking confirmed for ${selectedSlot}. Status: ${booking.status}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to confirm booking');
    } finally {
      setSaving(false);
    }
  }

  function closeModal() {
    setSelectedSlot(null);
    setSuccess(null);
    setError(null);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase text-indigo-600">Book session</p>
            <h3 className="mt-1 text-2xl font-bold text-gray-950">{service.title}</h3>
            {creator ? <p className="mt-1 text-sm font-medium text-gray-500">with {creator.name}</p> : null}
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-2 text-gray-500 transition-all duration-200 hover:border-indigo-700 hover:bg-indigo-700 hover:text-white active:scale-95"
            aria-label="Close booking modal"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-6 grid gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-gray-500">Service</span>
            <span className="text-right text-sm font-bold text-gray-950">{service.title}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-gray-500">Duration</span>
            <span className="text-sm font-bold text-gray-950">{service.durationMinutes} mins</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-gray-500">Price</span>
            <span className="text-xl font-bold text-gray-950">₹{service.price}</span>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          <h4 className="font-bold text-gray-950">Select a time slot</h4>
          <div className="grid grid-cols-3 gap-3">
            {timeSlots.map((slot) => (
              <button
                type="button"
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`cursor-pointer rounded-2xl border p-3 text-center text-sm font-semibold transition-all duration-200 active:scale-95 ${
                  selectedSlot === slot
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-md hover:bg-indigo-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-700 hover:bg-indigo-700 hover:text-white'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {error ? <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p> : null}
        {success ? (
          <p className="mt-5 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            {success}
          </p>
        ) : null}

        <div className="mt-6 grid gap-3">
          <button
            type="button"
            onClick={confirmBooking}
            disabled={!selectedSlot || saving || Boolean(success)}
            className="w-full cursor-pointer rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none disabled:hover:bg-gray-300 disabled:active:scale-100"
          >
            {saving ? 'Confirming...' : success ? 'Booking Confirmed' : 'Confirm Booking'}
          </button>
          {success ? (
            <button
              type="button"
              onClick={closeModal}
              className="w-full cursor-pointer rounded-2xl border border-indigo-200 bg-white px-4 py-3 font-semibold text-indigo-700 shadow-sm transition-all duration-200 hover:border-indigo-700 hover:bg-indigo-700 hover:text-white active:scale-95"
            >
              Done
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
