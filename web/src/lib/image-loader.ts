"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

export default function imageLoader({ src, width, quality }: LoaderArgs): string {
  const q = quality ?? 75;

  if (src.startsWith("https://images.unsplash.com/")) {
    return `${src}?w=${width}&q=${q}&auto=format&fit=max`;
  }

  if (src.startsWith("https://res.cloudinary.com/") && src.includes("/upload/")) {
    return src.replace("/upload/", `/upload/f_auto,q_${q},w_${width},c_limit/`);
  }

  return src;
}
