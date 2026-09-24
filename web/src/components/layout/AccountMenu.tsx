"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth/AuthProvider";

/** "Account" in the header: a link to sign in, or a small menu (Orders, Sign out) once signed in. */
export function AccountMenu() {
  const { signedIn, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !root.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  if (!signedIn) {
    return (
      <Link href="/login" className="label link-underline pb-0.5">
        Account
      </Link>
    );
  }

  return (
    <div ref={root} className="relative" onPointerEnter={() => setOpen(true)} onPointerLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="label link-underline flex items-center gap-2 pb-0.5"
      >
        <span aria-hidden className="size-1.5 rounded-full bg-champagne" />
        Account
      </button>
      <div
        role="menu"
        className={`absolute top-full right-0 w-48 pt-4 transition-[opacity,translate] duration-500 ease-[var(--ease-luxe)] ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="border border-ivory/10 bg-smoke py-2">
          <Link
            role="menuitem"
            href="/orders"
            onClick={() => setOpen(false)}
            className="block px-5 py-3 text-sm text-ivory/80 transition-colors hover:bg-ivory/5 hover:text-ivory"
          >
            Your orders
          </Link>
          <button
            role="menuitem"
            type="button"
            onClick={() => {
              setOpen(false);
              signOut();
              router.push("/");
            }}
            className="block w-full px-5 py-3 text-left text-sm text-ivory/80 transition-colors hover:bg-ivory/5 hover:text-ivory"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
