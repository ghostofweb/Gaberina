"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useLenis } from "@/components/providers/SmoothScroll";
import { DELIVERY_FEE, useBag } from "@/lib/bag/BagProvider";
import { isAuthError } from "@/lib/auth/api";
import { useAuth } from "@/lib/auth/AuthProvider";
import { OrderSummary } from "./OrderSummary";

type Field = {
  name: string;
  label: string;
  autoComplete: string;
  type?: string;
  half?: boolean;
  inputMode?: "numeric" | "tel" | "email";
  defaultValue?: string;
};

// Same address fields the previous storefront sent, so orders look identical in the admin.
const FIELDS: Field[] = [
  { name: "firstName", label: "First name", autoComplete: "given-name", half: true },
  { name: "lastName", label: "Last name", autoComplete: "family-name", half: true },
  { name: "email", label: "Email", autoComplete: "email", type: "email" },
  { name: "phone", label: "Phone", autoComplete: "tel", type: "tel" },
  { name: "street", label: "Street address", autoComplete: "street-address" },
  { name: "city", label: "City", autoComplete: "address-level2", half: true },
  { name: "state", label: "State", autoComplete: "address-level1", half: true },
  { name: "zipcode", label: "PIN code", autoComplete: "postal-code", half: true, inputMode: "numeric" },
  { name: "country", label: "Country", autoComplete: "country-name", half: true, defaultValue: "India" },
];

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done" } | { kind: "error"; message: string };

export function CheckoutView() {
  const { lines, subtotal, clear } = useBag();
  const { token, signOut } = useAuth();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const lenis = useLenis();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token || !BACKEND) return;
    const form = new FormData(e.currentTarget);
    const address = Object.fromEntries(FIELDS.map((f) => [f.name, String(form.get(f.name) ?? "")]));
    // Same payload shape the previous storefront sent to /api/order/place (cash on delivery).
    const items = lines.map(({ product, size, qty }) => ({ ...product, size, quantity: qty }));
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(`${BACKEND}/api/order/place`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ address, items, amount: subtotal + DELIVERY_FEE }),
      });
      const data = (await res.json()) as { success: boolean; message?: string };
      if (!data.success) throw new Error(data.message ?? "The order could not be placed.");
      clear();
      setStatus({ kind: "done" });
      // The confirmation is shorter than the form; bring it into view.
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      if (isAuthError(message)) {
        // Session expired: sign out (the bag stays) and ask for a fresh sign-in.
        signOut({ keepBag: true });
        setStatus({ kind: "error", message: "Your session has expired. Please sign in again — your bag is safe." });
        return;
      }
      setStatus({ kind: "error", message });
    }
  };

  if (status.kind === "done") {
    return (
      <section className="gutter flex min-h-[100svh] flex-col items-center justify-center text-center">
        <p className="label text-champagne">Order received</p>
        <h1 className="font-display mt-6 text-[clamp(3rem,8vw,7rem)] leading-none font-light">
          Merci, <em>truly</em>
        </h1>
        <p className="mt-6 max-w-md text-sm text-ivory/70">
          Your order is placed with cash on delivery. We will be in touch as it makes its way to you.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-10">
          <Link href="/orders" className="label link-underline pb-1">
            View your order
          </Link>
          <Link href="/collection" className="label link-underline pb-1 text-taupe hover:text-ivory">
            Return to the collection
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="gutter pt-[calc(var(--header-h)+10vh)] pb-32">
      <p className="label text-taupe">
        <span className="text-champagne">—</span> Checkout
      </p>
      <h1 className="font-display mt-6 text-[clamp(3rem,8vw,8rem)] leading-[0.9] font-light">
        Delivery <em>details</em>
      </h1>

      {lines.length === 0 ? (
        <p className="mt-12 text-sm text-ivory/70">
          Your bag is empty.{" "}
          <Link href="/collection" className="link-underline pb-0.5 text-ivory">
            Explore the collection
          </Link>
        </p>
      ) : (
        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <form onSubmit={onSubmit} className="md:col-span-7">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              {FIELDS.map((f) => (
                <label key={f.name} className={`group block ${f.half ? "col-span-1" : "col-span-2"}`}>
                  <span className="label text-taupe transition-colors group-focus-within:text-ivory">{f.label}</span>
                  <input
                    name={f.name}
                    required
                    type={f.type ?? "text"}
                    autoComplete={f.autoComplete}
                    inputMode={f.inputMode}
                    defaultValue={f.defaultValue}
                    className="mt-2 w-full border-b border-ivory/25 bg-transparent py-3 text-ivory outline-none transition-colors focus:border-ivory focus-visible:outline-none"
                  />
                </label>
              ))}
            </div>

            <fieldset className="mt-14">
              <legend className="label text-taupe">Payment</legend>
              <label className="mt-4 flex items-center gap-4 border border-ivory bg-ivory/[0.04] px-5 py-4">
                <input type="radio" name="payment" value="cod" defaultChecked className="accent-[#c6a15b]" />
                <span className="text-sm">Cash on delivery</span>
              </label>
            </fieldset>

            {!token && (
              <p className="mt-10 border-l border-champagne pl-4 text-sm text-ivory/70">
                Please{" "}
                <Link href="/login?next=/checkout" className="link-underline pb-0.5 text-ivory">
                  sign in
                </Link>{" "}
                to place your order — your bag will be waiting.
              </p>
            )}
            {status.kind === "error" && (
              <p role="alert" className="mt-6 text-sm text-champagne">
                {status.message}
              </p>
            )}

            <button
              type="submit"
              disabled={!token || status.kind === "sending"}
              className="group relative mt-10 flex h-16 w-full items-center justify-center overflow-hidden bg-ivory text-noir disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span
                aria-hidden
                className="absolute inset-0 translate-y-full bg-champagne transition-transform duration-700 ease-[var(--ease-luxe)] group-enabled:group-hover:translate-y-0"
              />
              <span className="label relative">{status.kind === "sending" ? "Placing order…" : "Place Order"}</span>
            </button>
          </form>

          <div className="md:col-span-5">
            <div className="md:sticky md:top-[calc(var(--header-h)+2rem)]">
              <OrderSummary />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
