import { motion } from "motion/react";
import { Fragment, type ReactNode } from "react";
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
  const { enabled, useBlur, lowPower, d, s: st } = useCinematics();
  const words = text.split(" ");
  return (
    <span className={`text-balance ${className}`}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
        <span
          className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
        >
          <motion.span
            className={enabled ? "inline-block will-change-[transform,opacity]" : "inline-block"}
            initial={{
              opacity: 0,
              y: lowPower ? "0.35em" : "0.55em",
              // Filter is always declared so motion owns the inline style;
              // weaker devices simply start at zero blur.
              filter: useBlur ? "blur(12px)" : "blur(0px)",
            }}
            whileInView={{
              opacity: 1,
              y: "0em",
              // Always clear the filter: the device may downgrade to
              // "no blur" after first paint, and a stale blur must not stick.
              filter: "blur(0px)",
            }}
            viewport={{ once, margin: VIEWPORT.margin }}
            transition={{
              duration: d(duration),
              delay: enabled ? st(delay + i * stagger) : 0,
              ease: EASE,
            }}
          >
            {word}
          </motion.span>
        </span>
        {i < words.length - 1 ? " " : ""}
        </Fragment>
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
  const { enabled, lowPower, d, s: st } = useCinematics();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: enabled ? (lowPower ? Math.min(y, 20) : y) : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: d(duration), delay: st(delay), ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
