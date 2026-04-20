import Link from 'next/link';

type ServiceCardProps = {
  id: string;
  title: string;
  description: string;
  price: number;
  durationMinutes: number;
};

export function ServiceCard({ id, title, description, price, durationMinutes }: ServiceCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="font-medium">₹{price}</span>
        <span>{durationMinutes} mins</span>
      </div>
      <Link
        href={`/book/${id}`}
        className="mt-4 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
      >
        Book now
      </Link>
    </article>
  );
}
