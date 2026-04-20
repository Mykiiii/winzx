export type User = {
  id: string;
  name: string;
  email?: string;
  username: string;
  bio?: string | null;
};

export type Service = {
  id: string;
  userId: string;
  title: string;
  description: string;
  price: number;
  durationMinutes: number;
  user?: User;
};

export type Booking = {
  id: string;
  userId: string;
  serviceId: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  service?: Service;
  user?: User;
};
