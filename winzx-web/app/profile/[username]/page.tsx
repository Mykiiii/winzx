import { ServiceCard } from '@/components/service-card';
import { apiFetch } from '@/lib/api';

type Service = {
  id: string;
  title: string;
  description: string;
  price: number;
  durationMinutes: number;
};

type ProfileResponse = {
  name: string;
  bio?: string;
  username: string;
  services: Service[];
};

export default async function ProfilePage({ params }: { params: { username: string } }) {
  let profile: ProfileResponse | null = null;
  let error: string | null = null;

  try {
    profile = await apiFetch<ProfileResponse>(`/users/username/${params.username}`);
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unable to load profile';
  }

  if (!profile) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-bold">Profile not available</h1>
        <p className="text-sm text-slate-600">{error}</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{profile.name}</h1>
        <p className="text-slate-600">@{profile.username}</p>
        <p className="text-slate-700">{profile.bio || 'No bio available yet.'}</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {profile.services.length > 0 ? (
          profile.services.map((service) => <ServiceCard key={service.id} {...service} />)
        ) : (
          <p className="text-sm text-slate-600">No services added yet.</p>
        )}
      </div>
    </section>
  );
}
