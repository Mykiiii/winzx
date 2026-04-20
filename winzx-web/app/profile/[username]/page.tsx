import { ServiceCard } from '@/components/service-card';
import { apiFetch } from '@/lib/api';
import type { Service, User } from '@/lib/types';

type ProfileResponse = User & {
  services?: Service[];
};

export default async function ProfilePage({ params }: { params: { username: string } }) {
  let profile: ProfileResponse | null = null;
  let services: Service[] = [];
  let error: string | null = null;

  try {
    profile = await apiFetch<ProfileResponse>(`/users/username/${params.username}`);
    services = await apiFetch<Service[]>(`/services?userId=${profile.id}`);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unable to load profile';
  }

  if (!profile) {
    return (
      <section className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-md">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>
        <div className="mt-5 grid gap-2">
          <h1 className="text-2xl font-bold text-gray-950">Profile not available</h1>
          <p className="text-sm text-gray-600">{error}</p>
        </div>
      </section>
    );
  }

  const firstName = profile.name.split(' ')[0] || profile.name;

  return (
    <div className="grid gap-8">
      <header className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md">
        <div className="h-24 bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500" />
        <div className="grid gap-6 p-6 pt-0 md:grid-cols-[1fr_auto] md:items-end md:p-8 md:pt-0">
          <div className="-mt-10 flex flex-col gap-5 sm:flex-row sm:items-end">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-indigo-600 to-emerald-500 text-4xl font-bold text-white shadow-md">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div className="grid gap-2 pb-1">
              <div>
                <h1 className="text-4xl font-bold text-gray-950">{profile.name}</h1>
                <p className="mt-1 text-base font-medium text-indigo-600">@{profile.username}</p>
              </div>
              <p className="max-w-2xl text-base leading-7 text-gray-600">
                {profile.bio || 'Experienced professional ready to help you grow.'}
              </p>
            </div>
          </div>
          <a
            href="#services"
            className="cursor-pointer rounded-2xl bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
          >
            Book a session
          </a>
        </div>
      </header>

      <section id="services" className="grid scroll-mt-28 gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-indigo-600">Services</p>
            <h2 className="mt-1 text-3xl font-bold text-gray-950">Book time with {firstName}</h2>
          </div>
          <p className="text-sm font-medium text-gray-500">{services.length} available</p>
        </div>

        {services.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <ServiceCard key={service.id} creator={profile} {...service} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-md">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mt-5 text-xl font-bold text-gray-950">No services yet</h3>
            <p className="mt-2 text-sm text-gray-600">This creator has not published any bookable sessions.</p>
          </div>
        )}
      </section>
    </div>
  );
}
