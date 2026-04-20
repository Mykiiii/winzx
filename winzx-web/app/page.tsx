import Link from 'next/link';

const features = [
  {
    title: 'Create your profile',
    description: 'Launch a polished public page that makes your expertise easy to trust.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0"
        />
      </svg>
    ),
  },
  {
    title: 'Offer services',
    description: 'Package calls, reviews, and sessions with clear pricing and availability.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2.25 4.5H6.75A2.25 2.25 0 014.5 18.25V5.75A2.25 2.25 0 016.75 3.5h7.19c.6 0 1.17.24 1.59.66l3.31 3.31c.42.42.66.99.66 1.59v9.19a2.25 2.25 0 01-2.25 2.25z"
        />
      </svg>
    ),
  },
  {
    title: 'Get booked',
    description: 'Turn attention into scheduled conversations with a smooth booking flow.',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M5.25 5.25h13.5A1.5 1.5 0 0120.25 6.75v12A1.5 1.5 0 0118.75 20.25H5.25A1.5 1.5 0 013.75 18.75v-12A1.5 1.5 0 015.25 5.25z"
        />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="grid gap-16">
      <section className="grid items-center gap-8 py-10 md:grid-cols-[1.05fr_0.95fr] md:py-16">
        <div className="grid gap-6 text-left">
          <div className="inline-flex w-fit items-center gap-2 rounded-2xl border border-indigo-100 bg-white px-3 py-1 text-sm font-semibold text-indigo-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Trusted creator storefronts
          </div>
          <div className="grid gap-4">
            <h1 className="max-w-3xl text-5xl font-bold text-gray-950 md:text-6xl">
              Turn your expertise into income
            </h1>
            <p className="max-w-xl text-xl leading-8 text-gray-600">
              Create your profile. Offer services. Get booked.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="cursor-pointer rounded-2xl bg-indigo-600 px-6 py-3 text-center text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
            >
              Get Started
            </Link>
            <a
              href="/profile/demo"
              className="cursor-pointer rounded-2xl border border-indigo-200 bg-white px-6 py-3 text-center text-base font-semibold text-indigo-700 shadow-sm transition-all duration-200 hover:border-indigo-700 hover:bg-indigo-700 hover:text-white hover:shadow-xl active:scale-95"
            >
              View Example Profile
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-emerald-50 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-300" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-500 shadow-sm">
                Live page
              </span>
            </div>

            <div className="grid gap-4">
              <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-bold text-white">
                  W
                </div>
                <div className="min-w-0 flex-1">
                  <div className="h-4 w-32 rounded-full bg-gray-900" />
                  <div className="mt-2 h-3 w-44 max-w-full rounded-full bg-gray-200" />
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  Available
                </div>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-gray-950">1:1 Strategy Call</p>
                    <p className="mt-1 text-sm text-gray-500">Product, growth, and career clarity.</p>
                  </div>
                  <p className="text-xl font-bold text-gray-950">₹999</p>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {['10 AM', '2 PM', '6 PM'].map((slot) => (
                    <span
                      key={slot}
                      className="rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2 text-center text-sm font-semibold text-gray-700"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-gray-950 px-4 py-3 text-white shadow-md">
                <span className="text-sm font-semibold">Bookings this week</span>
                <span className="text-2xl font-bold">24</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8">
        <div className="grid gap-2">
          <p className="text-sm font-bold uppercase text-indigo-600">How Winzx works</p>
          <h2 className="text-3xl font-bold text-gray-950">
            Everything you need to start selling your time.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group grid cursor-pointer gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-all duration-200 group-hover:bg-indigo-600 group-hover:text-white">
                {feature.icon}
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-bold text-gray-950">{feature.title}</h3>
                <p className="text-sm leading-6 text-gray-600">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
