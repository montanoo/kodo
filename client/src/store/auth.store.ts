import type { AuthUser } from '@kodo/shared/types/auth.types';
import { create } from 'zustand';

type AuthStore = {
  user: AuthUser | null;
  token: string | null;
  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
};

const storedToken = localStorage.getItem('auth');
const storedUser = localStorage.getItem('user');

const authStore = create<AuthStore>()((set) => ({
  user: storedUser ? (JSON.parse(storedUser) as AuthUser) : null,
  token: storedToken ?? null,
  setAuth: (user, token) => {
    localStorage.setItem('auth', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
    set({ user: null, token: null });
  },
}));

export default authStore;
