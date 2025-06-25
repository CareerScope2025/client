import type { KyInstance } from "ky";
import type { ReactNode } from "react";

import { create } from "zustand";

import { client } from "~/lib/client";
import { Register } from "~/pages/register";

export const useAuth = create<{
  client: KyInstance;
  setToken: (token: string) => void;
  token: null | string;
}>((set) => ({
  client,
  setToken: (token: string) =>
    set({
      client: client.extend({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      token,
    }),
  token: null,
}));

export const Auth = ({ children }: { children: ReactNode }) => {
  const token = useAuth((state) => state.token);
  if (!token) {
    return <Register />;
  }
  return children;
};
