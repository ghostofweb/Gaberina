"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { getOrders, isAuthError, type Order } from "@/lib/auth/api";
import { useAuth } from "@/lib/auth/AuthProvider";
import { formatINR } from "@/lib/format";
import { OrderTimeline, stepLabel } from "./OrderTimeline";

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

type State = { kind: "loading" } | { kind: "ready"; orders: Order[] } | { kind: "error"; message: string };

function OrderCard({ order, defaultOpen }: { order: Order; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const pieces = order.items.reduce((n, i) => n + (i.quantity || 0), 0);
  const address = [order.address.street, order.address.city, order.address.state, order.address.zipcode].filter(Boolean).join(", ");

  return (
    <li className="border-t border-ivory/10">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="grid w-full grid-cols-2 items-center gap-4 py-8 text-left md:grid-cols-[1.4fr_1fr_1fr_auto]"
      >
        <span>
          <span className="label block text-taupe">{dateFormat.format(order.date)}</span>
          <span className="font-display mt-2 block text-3xl leading-none">
            {pieces} {pieces === 1 ? "piece" : "pieces"}
          </span>
        </span>
        <span className="font-display text-right text-2xl tabular-nums md:text-left">{formatINR(order.amount)}</span>
        <span className="label hidden text-champagne md:block">{stepLabel(order.status)}</span>
        <span aria-hidden className="relative hidden size-3 md:block">
          <span className="absolute top-1/2 left-0 h-px w-full bg-current" />
          <span className={`absolute top-1/2 left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "" : "rotate-90"}`} />
        </span>
      </button>

      <div className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-luxe)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="pb-10">
            <OrderTimeline status={order.status} />
            <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
              <ul className="space-y-4">
                {order.items.map((item, i) => (
                  <li key={`${item._id}-${item.size}-${i}`} className="flex items-center gap-4">
                    <Link href={`/product/${item._id}`} className="relative aspect-[4/5] w-14 shrink-0 overflow-hidden bg-smoke">
                      {item.image?.[0] && <Image src={item.image[0]} alt={item.name} fill sizes="3.5rem" className="object-cover" />}
                    </Link>
                    <span className="flex-1">
                      <span className="font-display block text-xl leading-none">{item.name}</span>
                      <span className="mt-1 block text-xs text-ivory/60">
                        {item.size} × {item.quantity}
                      </span>
                    </span>
                    {item.price?.[item.size] !== undefined && (
                      <span className="text-sm tabular-nums">{formatINR(item.price[item.size] * item.quantity)}</span>
                    )}
                  </li>
                ))}
              </ul>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="label text-taupe">Payment</dt>
                  <dd className="mt-1">{order.paymentMethod === "COD" ? "Cash on delivery" : order.paymentMethod}</dd>
                </div>
                {address && (
                  <div>
                    <dt className="label text-taupe">Delivering to</dt>
                    <dd className="mt-1 text-ivory/80">
                      {[order.address.firstName, order.address.lastName].filter(Boolean).join(" ")}
                      <br />
                      {address}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function OrdersView() {
  const { token, signedIn, signOut } = useAuth();
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    if (!token) return;
    let live = true;
    getOrders(token)
      .then((orders) => live && setState({ kind: "ready", orders }))
      .catch((error: Error) => {
        if (!live) return;
        // A stale session: sign out so the page offers a fresh sign-in.
        if (isAuthError(error.message)) signOut({ keepBag: true });
        else setState({ kind: "error", message: error.message });
      });
    return () => {
      live = false;
    };
  }, [token, signOut]);

  const count = state.kind === "ready" ? state.orders.length : null;

  return (
    <section className="gutter min-h-[80svh] pt-[calc(var(--header-h)+12vh)] pb-32">
      <p className="label text-taupe">
        <span className="text-champagne">—</span> Your account
      </p>
      <div className="mt-6 flex items-start gap-3">
        <h1 className="font-display text-[clamp(3.5rem,10vw,10rem)] leading-[0.9] font-light">
          Your <em>Orders</em>
        </h1>
        {count !== null && <span className="label mt-[0.6em] text-champagne tabular-nums md:text-sm">({count})</span>}
      </div>

      <div className="mt-16">
        {!signedIn ? (
          <div className="flex flex-col items-start gap-8">
            <p className="max-w-md text-sm text-ivory/70">Sign in to see your orders and follow their journey to you.</p>
            <MagneticLink href="/login?next=/orders">Sign in</MagneticLink>
          </div>
        ) : state.kind === "loading" ? (
          <ul aria-label="Loading orders" className="space-y-px">
            {[0, 1, 2].map((i) => (
              <li key={i} className="h-28 animate-pulse border-t border-ivory/10 bg-gradient-to-r from-transparent via-ivory/[0.03] to-transparent" />
            ))}
          </ul>
        ) : state.kind === "error" ? (
          <p role="alert" className="border-l border-champagne pl-4 text-sm text-ivory/80">
            {state.message}
          </p>
        ) : state.orders.length === 0 ? (
          <div className="flex flex-col items-start gap-8">
            <p className="max-w-md text-sm text-ivory/70">No orders yet. Your first signature is waiting.</p>
            <MagneticLink href="/collection">Explore the Collection</MagneticLink>
          </div>
        ) : (
          <ul className="border-b border-ivory/10">
            {state.orders.map((order, i) => (
              <OrderCard key={order._id} order={order} defaultOpen={i === 0} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
