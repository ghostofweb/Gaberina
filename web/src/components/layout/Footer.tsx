"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Monogram } from "@/components/brand/Monogram";
import { Wordmark } from "@/components/brand/Wordmark";
import { useLenis } from "@/components/providers/SmoothScroll";
import { footerNav, socials } from "@/content/site";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const timeFormat = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

function IndiaTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setTime(timeFormat.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--"}</span>;
}

function Correspondence() {
  const [state, setState] = useState<"idle" | "done">("idle");
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No newsletter endpoint exists yet, so nothing is stored; the message says so honestly.
    setState("done");
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md">
      <p className="label text-taupe">Private Correspondence</p>
      <p className="font-display mt-4 text-3xl leading-tight font-light md:text-4xl">
        Letters on new compositions, <em>sent sparingly.</em>
      </p>
      {state === "done" ? (
        <p className="mt-10 text-sm text-ivory/80" role="status">
          <span className="label block text-champagne">Merci</span>
          <span className="mt-3 block">
            Our letters begin soon. Until then, new compositions appear first on{" "}
            <a href="https://www.instagram.com/gaberinaofficial" target="_blank" rel="noreferrer" className="link-underline pb-0.5 text-ivory">
              Instagram
            </a>
            .
          </span>
        </p>
      ) : (
        <div className="group mt-10 flex items-center border-b border-ivory/25 focus-within:border-ivory">
          <label htmlFor="footer-email" className="sr-only">
            Email address
          </label>
          <input
            id="footer-email"
            type="email"
            required
            placeholder="Your email address"
            className="w-full bg-transparent py-4 text-sm tracking-wide text-ivory outline-none placeholder:text-taupe"
          />
          <button type="submit" className="label shrink-0 pl-4 text-ivory transition-colors hover:text-champagne">
            Subscribe →
          </button>
        </div>
      )}
    </form>
  );
}

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from("[data-footer-mark] [data-letter]", {
          y: 110,
          duration: 1.6,
          stagger: 0.06,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-footer-mark]", start: "top 95%" },
        });
        gsap.from("[data-footer-reveal]", {
          y: 40,
          autoAlpha: 0,
          duration: 1.4,
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 2.2 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <footer ref={root} className="relative overflow-hidden bg-noir pt-32 text-ivory md:pt-44">
      <div className="gutter grid gap-16 md:grid-cols-12">
        <div data-footer-reveal className="md:col-span-5">
          <Correspondence />
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-6 md:col-start-7">
          {footerNav.map((group) => (
            <div data-footer-reveal key={group.title}>
              <p className="label text-taupe">{group.title}</p>
              <ul className="mt-6 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="link-underline pb-0.5 text-sm text-ivory/85 hover:text-ivory">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div data-footer-reveal className="gutter mt-24 flex flex-wrap items-center justify-between gap-6 text-taupe md:mt-32">
        <div className="flex items-center gap-4">
          <Monogram className="size-9 text-ivory/80" />
          <p className="label">
            India · <IndiaTime /> IST
          </p>
        </div>
        <div className="flex items-center gap-8">
          {socials.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="label link-underline pb-0.5 hover:text-ivory">
              {s.label}
            </a>
          ))}
          <button type="button" onClick={toTop} className="label link-underline pb-0.5 hover:text-ivory">
            Back to top ↑
          </button>
        </div>
      </div>

      <div className="gutter mt-10 hairline" />

      {/* Finale: the wordmark rises edge to edge. */}
      <div data-footer-mark className="gutter pt-10 pb-6 md:pt-14">
        <Wordmark className="block w-full text-ivory" />
      </div>

      <div className="gutter flex flex-wrap justify-between gap-4 pb-8 text-taupe">
        <p className="label">© {new Date().getFullYear()} Gaberina. All rights reserved.</p>
        <p className="label">Maison de Parfum</p>
      </div>
    </footer>
  );
}
