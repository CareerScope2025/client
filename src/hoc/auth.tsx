import type { KyInstance } from "ky";

import { type ReactNode, useEffect } from "react";
import { create } from "zustand";

import { client } from "~/lib/client";
import { Register } from "~/pages/register";

const TOKEN_KEY = "token";

export const useAuth = create<{
  client: KyInstance;
  setToken: (token: string) => void;
  token: null | string;
}>((set) => ({
  client,
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    set({
      client: client.extend({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      token,
    });
  },
  token: null,
}));

export const Auth = ({ children }: { children: ReactNode }) => {
  const { setToken, token } = useAuth();

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  if (!token) {
    return <Register />;
  }
  return children;
};
