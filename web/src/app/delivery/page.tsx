import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { delivery } from "@/content/legal";

export const metadata: Metadata = { title: "Delivery" };

export default function Page() {
  return <LegalPage doc={delivery} />;
}
