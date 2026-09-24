"use client";

/**
 * Tiny signal shared by the preloader and anything that should animate in once it lifts
 * (hero, header wordmark). Resolves immediately when the preloader is skipped.
 */
let done = false;
const listeners = new Set<() => void>();

export function completeIntro() {
  if (done) return;
  done = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function onIntroComplete(fn: () => void): () => void {
  if (done) {
    // Deferred rather than called inline: subscribers call this while setting up their own GSAP
    // context, and running animations synchronously there nests contexts into a cycle (stack overflow
    // when returning to a page after the intro has played).
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) fn();
    });
    return () => {
      cancelled = true;
    };
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}

