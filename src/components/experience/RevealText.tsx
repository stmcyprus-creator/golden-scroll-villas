import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE, TIMING, VIEWPORT, useCinematics } from "./orchestrator";

/**
 * Word-by-word reveal — as if the text is being written by light.
 * Timings come from the Transition Orchestrator, so headlines across the
 * film breathe on the same clock. Blur is dropped on weaker devices.
 */
export function RevealText({
  text,
  className = "",
  delay = 0,
  stagger = TIMING.stagger,
  duration = TIMING.reveal,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
}) {
  const { enabled, useBlur, d } = useCinematics();
  const words = text.split(" ");
  return (
    <span className={`text-balance ${className}`}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
        <span
          className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
        >
          <motion.span
            className="inline-block will-change-[transform,opacity]"
            initial={{
              opacity: 0,
              y: "0.55em",
              ...(useBlur ? { filter: "blur(12px)" } : {}),
            }}
            whileInView={{
              opacity: 1,
              y: "0em",
              ...(useBlur ? { filter: "blur(0px)" } : {}),
            }}
            viewport={{ once, margin: VIEWPORT.margin }}
            transition={{
              duration: d(duration),
              delay: enabled ? delay + i * stagger : 0,
              ease: EASE,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

/** A single element that floats in, slowly. */
export function Rise({
  children,
  delay = 0,
  y = 28,
  duration = TIMING.rise,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}) {
  const { enabled, d } = useCinematics();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: enabled ? y : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: d(duration), delay: enabled ? delay : 0, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
