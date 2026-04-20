'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Navbar() {
  const [message, setMessage] = useState<string | null>(null);

  function showLoginMessage() {
    setMessage('Login is coming soon. Create a profile to use the MVP.');
    window.setTimeout(() => setMessage(null), 2800);
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-gray-950 transition-all duration-200 hover:text-indigo-600">
            Winzx
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={showLoginMessage}
              className="cursor-pointer rounded-2xl border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition-all duration-200 hover:border-indigo-700 hover:bg-indigo-700 hover:text-white active:scale-95"
            >
              Login
            </button>
            <Link
              href="/dashboard"
              className="cursor-pointer rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
            >
              Create Profile
            </Link>
          </div>
        </nav>
      </header>

      {message ? (
        <div className="fixed right-4 top-20 z-50 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-xl">
          {message}
        </div>
      ) : null}
    </>
  );
}
