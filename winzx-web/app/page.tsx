import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="space-y-6">
      <p className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
        Winzx · MVP
      </p>
      <h1 className="text-4xl font-bold tracking-tight">Turn your expertise into income.</h1>
      <p className="max-w-2xl text-lg text-slate-600">
        Winzx is a simple creator storefront where experts can publish services, share their profile, and accept
        bookings.
      </p>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">MVP includes</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
          <li>Public creator profile page</li>
          <li>Service listing with price and duration</li>
          <li>Basic booking flow with slot conflict validation</li>
        </ul>
      </div>
      <p className="text-sm text-slate-500">
        Demo profile route:{' '}
        <Link className="text-indigo-600 underline" href="/profile/demo-creator">
          /profile/demo-creator
        </Link>
      </p>
    </section>
  );
}
