"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { media } from "@/content/media";
import { DELIVERY_FEE } from "@/lib/bag/BagProvider";
import { formatINR } from "@/lib/format";

const INSTAGRAM_HANDLE = "gaberinaofficial";
const SUBJECTS = ["A general enquiry", "An order", "Gifting"];

/**
 * There is no message endpoint yet, so the form composes the message, copies it to the
 * clipboard and opens an Instagram DM — and says so plainly.
 */
export function ContactView() {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [copied, setCopied] = useState<"idle" | "copied" | "manual">("idle");
  const [composed, setComposed] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const text = [
      `Hello Gaberina — ${subject}.`,
      "",
      String(form.get("message") ?? "").trim(),
      "",
      `${String(form.get("name") ?? "").trim()} · ${String(form.get("email") ?? "").trim()}`,
    ].join("\n");
    setComposed(text);
    try {
      await navigator.clipboard.writeText(text);
      setCopied("copied");
    } catch {
      setCopied("manual");
    }
    window.open(`https://ig.me/m/${INSTAGRAM_HANDLE}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="gutter pt-[calc(var(--header-h)+12vh)] pb-32">
      <p className="label text-taupe">
        <span className="text-champagne">—</span> Contact
      </p>
      <h1 className="font-display mt-6 text-[clamp(3.5rem,10vw,10rem)] leading-[0.9] font-light">
        Write to <em>us</em>
      </h1>

      <div className="mt-16 grid gap-16 md:grid-cols-12">
        <form onSubmit={onSubmit} className="md:col-span-7">
          <fieldset>
            <legend className="label text-taupe">Regarding</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={subject === s}
                  onClick={() => setSubject(s)}
                  className={`rounded-full border px-4 py-2 text-xs tracking-wide transition-colors duration-500 ${
                    subject === s ? "border-ivory bg-ivory text-noir" : "border-ivory/20 text-ivory/80 hover:border-ivory/60"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8">
            {[
              { name: "name", label: "Your name", autoComplete: "name", half: true },
              { name: "email", label: "Email", autoComplete: "email", type: "email", half: true },
            ].map((f) => (
              <label key={f.name} className="group col-span-2 block md:col-span-1">
                <span className="label text-taupe transition-colors group-focus-within:text-ivory">{f.label}</span>
                <input
                  name={f.name}
                  required
                  type={f.type ?? "text"}
                  autoComplete={f.autoComplete}
                  className="mt-2 w-full border-b border-ivory/25 bg-transparent py-3 text-ivory outline-none transition-colors focus:border-ivory focus-visible:outline-none"
                />
              </label>
            ))}
            <label className="group col-span-2 block">
              <span className="label text-taupe transition-colors group-focus-within:text-ivory">Message</span>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-2 w-full resize-none border-b border-ivory/25 bg-transparent py-3 text-ivory outline-none transition-colors focus:border-ivory focus-visible:outline-none"
              />
            </label>
          </div>

          <p className="mt-10 text-xs leading-relaxed text-ivory/50">
            We reply personally on Instagram. Sending copies your message and opens a conversation with @{INSTAGRAM_HANDLE} —
            simply paste and send.
          </p>

          <button type="submit" className="group relative mt-6 flex h-16 w-full items-center justify-center overflow-hidden bg-ivory text-noir md:w-auto md:px-14">
            <span
              aria-hidden
              className="absolute inset-0 translate-y-full bg-champagne transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:translate-y-0"
            />
            <span className="label relative">Send via Instagram →</span>
          </button>

          {copied === "copied" && (
            <p role="status" className="mt-6 text-sm text-champagne">
              Your message is copied — paste it into the Instagram conversation that just opened.
            </p>
          )}
          {copied === "manual" && (
            <div role="status" className="mt-6 text-sm text-ivory/80">
              <p className="text-champagne">Copy your message below, then paste it into Instagram:</p>
              <pre className="mt-3 whitespace-pre-wrap border border-ivory/10 bg-smoke p-4 font-sans text-xs">{composed}</pre>
            </div>
          )}
        </form>

        <aside className="space-y-10 md:col-span-4 md:col-start-9">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={media.blossom.src} alt={media.blossom.alt} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover brightness-[0.75]" />
          </div>
          <div>
            <p className="label text-taupe">Instagram</p>
            <a
              href={`https://www.instagram.com/${INSTAGRAM_HANDLE}`}
              target="_blank"
              rel="noreferrer"
              className="font-display link-underline mt-2 inline-block pb-1 text-3xl"
            >
              @{INSTAGRAM_HANDLE}
            </a>
          </div>
          <div>
            <p className="label text-taupe">About an order</p>
            <p className="mt-2 text-sm text-ivory/70">
              Follow its journey in{" "}
              <Link href="/orders" className="link-underline pb-0.5 text-ivory">
                your orders
              </Link>
              . Every order ships with a flat {formatINR(DELIVERY_FEE)} delivery charge.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
