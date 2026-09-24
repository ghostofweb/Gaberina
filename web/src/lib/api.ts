import "server-only";
import type { Product } from "./types";

const BACKEND_URL = process.env.BACKEND_URL;

type ListResponse = { success: boolean; products?: Product[]; message?: string };

export async function getProducts(): Promise<Product[]> {
  if (!BACKEND_URL) {
    console.error("BACKEND_URL is not set");
    return [];
  }
  try {
    const res = await fetch(`${BACKEND_URL}/api/product/list`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as ListResponse;
    if (!data.success || !data.products) throw new Error(data.message ?? "Malformed response");
    return data.products;
  } catch (error) {
    console.error("Failed to load products:", error);
    return [];
  }
}
