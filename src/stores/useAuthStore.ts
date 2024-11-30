import { User } from "@/types/entities";
import { create } from "zustand";

type AuthState = {
  auth: User | null;
  token: string | null;
};

type AuthActions = {
  setAuth: (auth: User, token: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  auth: null,
  token: null,
  setAuth: async (auth: User, token: string) => {
    set({ token: token, auth: auth });
  },
  clearAuth: () => {
    set({ token: null, auth: null });
  },
}));
