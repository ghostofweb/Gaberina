import type { Metadata } from "next";
import { AuthForm } from "@/components/account/AuthForm";

export const metadata: Metadata = { title: "Sign in" };

/** Only same-site paths are allowed as a post-login destination. */
function safeNext(value: string | string[] | undefined) {
  const next = Array.isArray(value) ? value[0] : value;
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/orders";
}

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { next } = await searchParams;
  return <AuthForm next={safeNext(next)} />;
}
