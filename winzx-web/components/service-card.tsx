'use client';

import { useState } from 'react';
import { BookingModal } from './booking-modal';
import type { User } from '@/lib/types';

type ServiceCardProps = {
  id: string;
  creator?: User;
  title: string;
  description: string;
  price: number;
  durationMinutes: number;
};

export function ServiceCard({ id, creator, title, description, price, durationMinutes }: ServiceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <article className="group grid gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl">
        <div className="grid gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-all duration-200 group-hover:bg-indigo-600 group-hover:text-white">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
              />
            </svg>
          </div>
          <div className="grid gap-2">
            <h3 className="text-xl font-bold text-gray-950">{title}</h3>
            <p className="text-sm leading-6 text-gray-600">{description}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-950">₹{price}</p>
            <p className="mt-1 text-sm font-medium text-gray-500">{durationMinutes} mins</p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
          >
            Book Now
          </button>
        </div>
      </article>

      <BookingModal
        service={{ id, title, price, durationMinutes }}
        creator={creator}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
