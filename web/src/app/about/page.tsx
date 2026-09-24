import type { Metadata } from "next";
import { AboutView } from "@/components/about/AboutView";

export const metadata: Metadata = {
  title: "The Maison",
  description: "The story of Maison Gaberina — perfume oils and parfums composed for moments felt rather than seen.",
};

export default function AboutPage() {
  return <AboutView />;
}
