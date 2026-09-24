"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Monogram } from "@/components/brand/Monogram";
import { media } from "@/content/media";
import { login, register } from "@/lib/auth/api";
import { useAuth } from "@/lib/auth/AuthProvider";
import { gsap, useGSAP } from "@/lib/gsap";

type Mode = "signin" | "register";

const COPY: Record<Mode, { eyebrow: string; title: [string, string]; submit: string; switchText: string; switchCta: string }> = {
  signin: {
    eyebrow: "Welcome",
    title: ["Welcome", "back"],
    submit: "Sign in",
    switchText: "New to the Maison?",
    switchCta: "Create an account",
  },
  register: {
    eyebrow: "Create an account",
    title: ["Join the", "Maison"],
    submit: "Create account",
    switchText: "Already have an account?",
    switchCta: "Sign in",
  },
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({
  label,
  error,
  ...props
}: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="group block">
      <span className="label text-taupe transition-colors group-focus-within:text-ivory">{label}</span>
      <input
        {...props}
        aria-invalid={Boolean(error)}
        className="mt-2 w-full border-b border-ivory/25 bg-transparent py-3 text-ivory outline-none transition-colors focus:border-ivory focus-visible:outline-none aria-[invalid=true]:border-champagne"
      />
      {error && <span className="mt-2 block text-xs text-champagne">{error}</span>}
    </label>
  );
}

export function AuthForm({ next }: { next: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const { signIn, signedIn } = useAuth();
  const router = useRouter();
  const copy = COPY[mode];

  // Already signed in (e.g. a bookmarked /login): go straight on.
  useEffect(() => {
    if (signedIn && !pending) router.replace(next);
  }, [signedIn, pending, next, router]);

  // Heading and form rows fade through when switching modes.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo("[data-auth-swap]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.06, ease: "expo.out" });
    },
    { scope: root, dependencies: [mode] },
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    // Mirrors the backend's rules so most mistakes are caught before a round trip.
    const found: Record<string, string> = {};
    if (mode === "register" && !name) found.name = "Please tell us your name.";
    if (!EMAIL.test(email)) found.email = "Please enter a valid email address.";
    if (mode === "register" ? password.length < 8 : !password)
      found.password = mode === "register" ? "Use at least 8 characters." : "Please enter your password.";
    setErrors(found);
    if (Object.keys(found).length) return;

    setPending(true);
    try {
      const token = mode === "signin" ? await login(email, password) : await register(name, email, password);
      signIn(token);
      router.push(next);
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : "Something went wrong." });
      setPending(false);
    }
  };

  return (
    <div ref={root} className="grid min-h-[100svh] md:grid-cols-2">
      <div className="relative hidden overflow-hidden md:block">
        <div data-kenburns className="absolute inset-0 animate-[kenburns_24s_ease-in-out_infinite_alternate]">
          <Image src={media.darkBloom.src} alt={media.darkBloom.alt} fill priority sizes="50vw" className="object-cover brightness-[0.55]" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-noir via-noir/20 to-noir/40" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-[var(--gutter)] pb-12">
          <Monogram className="size-16 text-ivory/80" />
          <p className="font-display max-w-xs text-right text-2xl leading-snug font-light text-ivory/80 italic">
            A scent that arrives before you do.
          </p>
        </div>
      </div>

      <div className="gutter flex flex-col justify-center pt-[calc(var(--header-h)+6vh)] pb-20 md:px-[6vw]">
        <p data-auth-swap className="label text-taupe">
          <span className="text-champagne">—</span> {copy.eyebrow}
        </p>
        <h1 data-auth-swap className="font-display mt-6 text-[clamp(3rem,6vw,6rem)] leading-[0.95] font-light">
          {copy.title[0]} <em>{copy.title[1]}</em>
        </h1>

        <form onSubmit={onSubmit} noValidate className="mt-14 max-w-md space-y-8">
          {mode === "register" && (
            <div data-auth-swap>
              <Field label="Name" name="name" autoComplete="name" error={errors.name} />
            </div>
          )}
          <div data-auth-swap>
            <Field label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
          </div>
          <div data-auth-swap className="relative">
            <Field
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              error={errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-pressed={showPassword}
              className="label absolute top-9 right-0 text-taupe transition-colors hover:text-ivory"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {errors.form && (
            <p role="alert" className="border-l border-champagne pl-4 text-sm text-ivory/80">
              {errors.form}
            </p>
          )}

          <button
            data-auth-swap
            type="submit"
            disabled={pending}
            className="group relative flex h-16 w-full items-center justify-center overflow-hidden bg-ivory text-noir disabled:opacity-50"
          >
            <span
              aria-hidden
              className="absolute inset-0 translate-y-full bg-champagne transition-transform duration-700 ease-[var(--ease-luxe)] group-enabled:group-hover:translate-y-0"
            />
            <span className="label relative">{pending ? "One moment…" : copy.submit}</span>
          </button>
        </form>

        <p data-auth-swap className="mt-10 text-sm text-ivory/60">
          {copy.switchText}{" "}
          <button
            type="button"
            onClick={() => {
              setErrors({});
              setMode(mode === "signin" ? "register" : "signin");
            }}
            className="link-underline pb-0.5 text-ivory"
          >
            {copy.switchCta}
          </button>
        </p>
      </div>
    </div>
  );
}
