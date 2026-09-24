import type { Product } from "@/lib/types";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

type AuthResponse = { success: boolean; token?: string; message?: string };

export type OrderItem = Product & { size: string; quantity: number };

export type Order = {
  _id: string;
  items: OrderItem[];
  amount: number;
  address: Record<string, string>;
  status: string;
  paymentMethod: string;
  payment: boolean;
  date: number;
};

async function post<T>(path: string, body?: unknown, token?: string): Promise<T> {
  if (!BACKEND) throw new Error("The store is not configured (NEXT_PUBLIC_BACKEND_URL).");
  let res: Response;
  try {
    res = await fetch(`${BACKEND}${path}`, {
      method: "POST",
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("We couldn't reach the Maison. Please check your connection and try again.");
  }
  return (await res.json()) as T;
}

async function authenticate(path: string, body: Record<string, string>) {
  const data = await post<AuthResponse>(path, body);
  if (!data.success || !data.token) throw new Error(data.message ?? "Something went wrong. Please try again.");
  return data.token;
}

export const login = (email: string, password: string) => authenticate("/api/user/login", { email, password });

export const register = (name: string, email: string, password: string) =>
  authenticate("/api/user/register", { name, email, password });

/** The backend's auth middleware answers with these when a token is missing, invalid or expired. */
export const isAuthError = (message: string) => /token|not authori[sz]ed/i.test(message);

export async function getOrders(token: string): Promise<Order[]> {
  const data = await post<{ success: boolean; orders?: Order[]; message?: string }>("/api/order/userorders", undefined, token);
  if (!data.success) throw new Error(data.message ?? "Your orders could not be loaded.");
  return (data.orders ?? []).sort((a, b) => b.date - a.date);
}
