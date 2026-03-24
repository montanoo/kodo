import type { AuthUser } from '@kodo/shared/types/auth.types';
import { create } from 'zustand';

type AuthStore = {
  user: AuthUser | null;
  token: string | null;
  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
};

const authStore = create<AuthStore>()((set) => ({
  user: null,
  token: null,
  setAuth: (user, token) => {
    localStorage.setItem('auth', token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('auth');
    set({ user: null, token: null });
  },
}));

export default authStore;
