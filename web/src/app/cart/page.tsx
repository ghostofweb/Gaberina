import type { Metadata } from "next";
import { CartView } from "@/components/checkout/CartView";

export const metadata: Metadata = { title: "Your Bag" };

export default function CartPage() {
  return <CartView />;
}
