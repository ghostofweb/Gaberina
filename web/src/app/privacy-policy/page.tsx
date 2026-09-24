import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacy } from "@/content/legal";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return <LegalPage doc={privacy} />;
}
