import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { terms } from "@/content/legal";

export const metadata: Metadata = { title: "Terms of Sale" };

export default function Page() {
  return <LegalPage doc={terms} />;
}
