"use client";

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { authToken, bagStore, mergeGuestBagIntoAccount } from "@/lib/bag/store";

/** Same localStorage key the previous storefront used, so existing sessions carry over. */
const TOKEN_KEY = "token";
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((fn) => fn());

const store = {
  subscribe(fn: () => void) {
    listeners.add(fn);
    const onStorage = (e: StorageEvent) => e.key === TOKEN_KEY && fn();
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(fn);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot: authToken,
  getServerSnapshot: () => null,
};

type Auth = {
  token: string | null;
  signedIn: boolean;
  signIn: (token: string) => void;
  /** `keepBag` for an expired session: the visitor didn't choose to leave, so their bag stays. */
  signOut: (options?: { keepBag?: boolean }) => void;
};

const AuthContext = createContext<Auth | null>(null);

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("useAuth must be used inside <AuthProvider>");
  return auth;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const token = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);

  const value = useMemo<Auth>(
    () => ({
      token,
      signedIn: Boolean(token),
      signIn(next) {
        try {
          localStorage.setItem(TOKEN_KEY, next);
        } catch {}
        emit();
        // Keep what was gathered as a guest: it joins the account's saved bag.
        void mergeGuestBagIntoAccount();
      },
      signOut({ keepBag = false } = {}) {
        try {
          localStorage.removeItem(TOKEN_KEY);
        } catch {}
        if (!keepBag) bagStore.set({}, { persistRemote: false });
        emit();
      },
    }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
