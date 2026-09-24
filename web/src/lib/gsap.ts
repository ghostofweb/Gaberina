"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, Flip, useGSAP);

gsap.defaults({ ease: "expo.out", duration: 1.2 });

/** Use with gsap.matchMedia() so heavy motion only runs when the user allows it. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { Flip, gsap, ScrollTrigger, SplitText, useGSAP };

