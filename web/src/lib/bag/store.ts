"use client";

/** { [productId]: { [size]: quantity } } — the same shape the backend's cartData uses. */
export type BagItems = Record<string, Record<string, number>>;

/** localStorage keys shared with the previous storefront. */
const GUEST_KEY = "guestCart";
const TOKEN_KEY = "token";

const EMPTY: BagItems = {};
let items: BagItems | null = null;
const listeners = new Set<() => void>();

function clean(raw: unknown): BagItems {
  if (!raw || typeof raw !== "object") return {};
  const out: BagItems = {};
  for (const [id, sizes] of Object.entries(raw as Record<string, unknown>)) {
    if (!sizes || typeof sizes !== "object") continue;
    for (const [size, qty] of Object.entries(sizes as Record<string, unknown>)) {
      const n = Math.floor(Number(qty));
      if (n > 0) (out[id] ??= {})[size] = n;
    }
  }
  return out;
}

function load(): BagItems {
  try {
    return clean(JSON.parse(localStorage.getItem(GUEST_KEY) ?? "{}"));
  } catch {
    return {};
  }
}

function emit() {
  listeners.forEach((fn) => fn());
}

export const bagStore = {
  subscribe(fn: () => void) {
    listeners.add(fn);
    const onStorage = (e: StorageEvent) => {
      if (e.key === GUEST_KEY) {
        items = load();
        emit();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(fn);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot(): BagItems {
    return (items ??= load());
  },
  getServerSnapshot(): BagItems {
    return EMPTY;
  },
  /** Replace the bag. `persistRemote: false` when the data came from the server itself. */
  set(next: BagItems, { persistRemote = true } = {}) {
    items = clean(next);
    try {
      localStorage.setItem(GUEST_KEY, JSON.stringify(items));
    } catch {}
    emit();
    if (persistRemote) scheduleRemoteSave();
  },
};

export function authToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;
let saveTimer: ReturnType<typeof setTimeout> | undefined;

function scheduleRemoteSave() {
  const token = authToken();
  if (!token || !BACKEND) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try {
      await fetch(`${BACKEND}/api/cart/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ cartData: bagStore.getSnapshot() }),
      });
    } catch (error) {
      console.error("Failed to save bag:", error);
    }
  }, 600);
}

/** Signed-in visitors: the server's cart wins over the local one on load. */
export async function loadRemoteBag() {
  const token = authToken();
  if (!token || !BACKEND) return;
  try {
    const res = await fetch(`${BACKEND}/api/cart/get`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = (await res.json()) as { success: boolean; cartData?: BagItems };
    if (data.success) bagStore.set(data.cartData ?? {}, { persistRemote: false });
  } catch (error) {
    console.error("Failed to load bag:", error);
  }
}

/**
 * At the moment a guest signs in: add what they gathered as a guest to the account's saved
 * bag (quantities are summed), then save the combined bag back to the account.
 * Only for the sign-in transition — on ordinary page loads the saved bag simply wins.
 */
export async function mergeGuestBagIntoAccount() {
  const token = authToken();
  const guest = bagStore.getSnapshot();
  if (!token || !BACKEND) return;
  let saved: BagItems = {};
  try {
    const res = await fetch(`${BACKEND}/api/cart/get`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = (await res.json()) as { success: boolean; cartData?: BagItems };
    if (!data.success) return; // keep the guest bag locally rather than overwrite the account's
    saved = clean(data.cartData ?? {});
  } catch (error) {
    console.error("Failed to load saved bag:", error);
    return;
  }
  const merged: BagItems = structuredClone(saved);
  for (const [id, sizes] of Object.entries(guest)) {
    for (const [size, qty] of Object.entries(sizes)) {
      (merged[id] ??= {})[size] = (merged[id][size] ?? 0) + qty;
    }
  }
  bagStore.set(merged); // persists locally and saves to the account
}
