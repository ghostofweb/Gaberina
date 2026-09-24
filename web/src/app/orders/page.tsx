import type { Metadata } from "next";
import { OrdersView } from "@/components/account/OrdersView";

export const metadata: Metadata = { title: "Your Orders" };

export default function OrdersPage() {
  return <OrdersView />;
}
