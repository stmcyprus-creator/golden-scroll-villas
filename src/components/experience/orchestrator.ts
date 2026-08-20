import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Transition Orchestrator
 * ------------------------------------------------------------------
 * One clock for the whole film. Every seam, blur release and content
 * reveal derives its duration and delay from here, so scenes hand over
 * to each other on a shared rhythm instead of each animating alone.
 */

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Base beat of the film, in seconds. Everything is a multiple of it. */
export const BEAT = 0.6;

export const TIMING = {
  /** Light seam draws in / releases. */
  seam: BEAT * 4,
  /** Headline words write themselves with light. */
  reveal: BEAT * 2.6,
  /** Body / secondary content rises after the headline. */
  rise: BEAT * 2.4,
  /** Hover and state changes on interactive surfaces. */
  surface: BEAT * 1.2,
  /** Word-to-word stagger inside a headline. */
  stagger: BEAT * 0.18,
  /** Handover: how long after a seam the next scene starts breathing. */
  handover: BEAT * 0.5,
} as const;

/** Blur amount used at the start of every content release. */
export const BLUR = "blur(12px)";

/** Viewport trigger shared by every scene, so all scenes wake at the same point. */
export const VIEWPORT = { once: true, margin: "-12%" } as const;

/** True when the visitor asked for calm, or the device can't afford the film. */
export function useCinematics() {
  const reduced = useReducedMotion();
  const [lowPower, setLowPower] = useState(false);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    const cores = (navigator as Navigator & { hardwareConcurrency?: number })
      .hardwareConcurrency;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    setCoarse(isCoarse);
    // Phones and tablets carry the film on a much smaller budget: keep the
    // choreography, drop the frame-eating filters.
    setLowPower(isCoarse || narrow || (cores ?? 8) <= 4 || (memory ?? 8) <= 4);
  }, []);

  const enabled = !reduced;

  return {
    /** Motion allowed at all. */
    enabled,
    /** Touch device: no hover, interactions unfold on scroll and tap. */
    coarse,
    /** Reduce expensive effects (blur/filter animation, parallax) on phones. */
    lowPower,
    /** Filter animation is the most expensive thing we do — drop it first. */
    useBlur: enabled && !lowPower,
    /**
     * Scale a duration: 0 when motion is off, a touch quicker on phones so
     * long transforms don't outlive a fast thumb scroll.
     */
    d: (seconds: number) =>
      enabled ? (lowPower ? Math.max(0.35, seconds * 0.68) : seconds) : 0.001,
    /** Stagger between siblings — tightened on phones. */
    s: (seconds: number) => (enabled ? (lowPower ? seconds * 0.6 : seconds) : 0),
    /** Parallax distance multiplier. */
    p: enabled ? (lowPower ? 0.45 : 1) : 0,
  };
}

/** The chapters of the film, in order. Drives the on-screen progress rail. */
export const CHAPTERS = [
  { id: "story", label: "Вдохновение" },
  { id: "trust", label: "Доверие" },
  { id: "locations", label: "Направления" },
  { id: "residences", label: "Резиденции" },
  { id: "gallery", label: "Галерея" },
  { id: "concierge", label: "Разговор" },
] as const;
