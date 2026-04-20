import type { User } from './types';

const CREATOR_KEY = 'winzx:creator';
const CUSTOMER_KEY = 'winzx:customer';

type StoredUser = {
  id: string;
  username: string;
};

function readUser(key: string): StoredUser | null {
  if (typeof window === 'undefined') return null;

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as StoredUser) : null;
  } catch {
    return null;
  }
}

function writeUser(key: string, user: Pick<User, 'id' | 'username'>) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify({ id: user.id, username: user.username }));
}

export function getStoredCreator() {
  return readUser(CREATOR_KEY);
}

export function storeCreator(user: Pick<User, 'id' | 'username'>) {
  writeUser(CREATOR_KEY, user);
}

export function clearStoredCreator() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(CREATOR_KEY);
}

export function getStoredCustomer() {
  return readUser(CUSTOMER_KEY);
}

export function storeCustomer(user: Pick<User, 'id' | 'username'>) {
  writeUser(CUSTOMER_KEY, user);
}
