const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.text();
    let message = body;

    try {
      const parsed = JSON.parse(body) as { message?: string | string[] };
      message = Array.isArray(parsed.message) ? parsed.message.join(', ') : parsed.message || body;
    } catch {
      message = body;
    }

    throw new Error(message || `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}
