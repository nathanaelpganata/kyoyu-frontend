import { produce } from 'immer';
import { create } from 'zustand';
import {
  createSelectorHooks,
  ZustandHookSelectors,
} from 'auto-zustand-selectors-hook';
import { persist } from 'zustand/middleware';

type AuthStoretype = {
  isAuth: boolean;
  userId: string;
  email: string;
  role: string;
  setIsAuth: (isAuth: boolean) => void;
  setUserId: (userId: string) => void;
  setEmail: (email: string) => void;
  setRole: (role: string) => void;
};

const useAuthStoreBase = create<AuthStoretype>()(
  persist(
    (set) => ({
      isAuth: false,
      userId: '',
      email: '',
      role: '',
      setIsAuth: (isAuth: boolean) =>
        set(
          produce((state) => {
            state.isAuth = isAuth;
          }),
        ),
      setUserId: (userId: string) =>
        set(
          produce((state) => {
            state.userId = userId;
          }),
        ),
      setEmail: (email: string) =>
        set(
          produce((state) => {
            state.email = email;
          }),
        ),
      setRole: (role: string) =>
        set(
          produce((state) => {
            state.role = role;
          }),
        ),
    }),
    { name: 'authStore' },
  ),
);

const useAuthStore = createSelectorHooks(
  useAuthStoreBase,
) as typeof useAuthStoreBase & ZustandHookSelectors<AuthStoretype>;

export default useAuthStore;
