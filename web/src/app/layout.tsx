import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { BagDrawer } from "@/components/bag/BagDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { getProducts } from "@/lib/api";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { BagProvider } from "@/lib/bag/BagProvider";
import { CatalogProvider } from "@/lib/catalog-context";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gaberina — Maison de Parfum",
    template: "%s — Gaberina",
  },
  description:
    "Fragrances composed as quiet signatures — felt before they are noticed, remembered long after.",
  openGraph: {
    siteName: "Gaberina",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0b0a",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Cached (revalidate 300s) and deduped with page-level calls.
  const products = await getProducts();

  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <SmoothScroll>
          <CatalogProvider products={products}>
            <AuthProvider>
              <BagProvider>
                <Preloader />
                <Header />
                <main>{children}</main>
                <Footer />
                <BagDrawer />
                <Cursor />
              </BagProvider>
            </AuthProvider>
          </CatalogProvider>
        </SmoothScroll>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
