import { media, type Media } from "./media";

export type NavLink = { label: string; href: string; image: Media };

export const primaryNav: NavLink[] = [
  { label: "Fragrances", href: "/collection", image: media.flaconShadow },
  { label: "Perfume Oils", href: "/collection?category=Oil", image: media.vials },
  { label: "Parfums", href: "/collection?category=Perfume", image: media.goldenFlaconSilk },
  { label: "The Maison", href: "/about", image: media.pipette },
  { label: "Contact", href: "/contact", image: media.smoke },
];

export const footerNav = [
  {
    title: "Maison",
    links: [
      { label: "Fragrances", href: "/collection" },
      { label: "Our Story", href: "/about" },
    ],
  },
  {
    title: "Client Services",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Delivery", href: "/delivery" },
      { label: "Track an Order", href: "/orders" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Sale", href: "/terms" },
    ],
  },
];

export const socials = [{ label: "Instagram", href: "https://www.instagram.com/gaberinaofficial" }];
