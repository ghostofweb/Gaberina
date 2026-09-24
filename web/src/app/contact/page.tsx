import type { Metadata } from "next";
import { ContactView } from "@/components/contact/ContactView";

export const metadata: Metadata = { title: "Contact", description: "Write to Maison Gaberina." };

export default function ContactPage() {
  return <ContactView />;
}
