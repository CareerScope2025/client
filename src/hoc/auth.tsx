import type { ReactNode } from "react";

import { create } from "zustand";

import { Register } from "~/pages/register";

const useAuth = create<{
  setToken: (token: null | string) => void;
  token: null | string;
}>((set) => ({
  setToken: (token: null | string) => set({ token }),
  token: null,
}));

export const Auth = ({ children }: { children: ReactNode }) => {
  const token = useAuth((state) => state.token);
  if (!token) {
    return <Register />;
  }
  return children;
};
