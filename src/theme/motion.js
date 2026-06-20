// theme/motion.js
//
// Centralized Framer Motion variants and timing values. Scenes and motion
// components compose these — they do not define their own durations,
// easings, or animation curves locally. This is the animation equivalent of
// the Design Bible's "do not introduce new visual styles" rule.
//
// What's deliberately absent: typing effects, bounce/spring overshoot,
// floating loops, rotation. They aren't filtered out elsewhere — they were
// just never written here, so there's nothing for a scene to import.

export const ease = {
  cinematic: [0.16, 1, 0.3, 1], // slow settle, no overshoot
  soft: [0.4, 0, 0.2, 1],
};

export const duration = {
  fast: 0.4,
  base: 0.8,
  slow: 1.4,
  ambient: 2.4,
};

// Default fade — the baseline reveal used across most scenes.
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: ease.cinematic },
  },
};

// Fade + slight rise — the default scene-content reveal-on-scroll.
export const revealUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.cinematic },
  },
};

// Same motion profile as revealUp, exported separately so a scene can
// target copy independent of imagery without inventing a new curve.
export const textReveal = revealUp;

// Slow ambient parallax. Not a discrete variant — these are config values
// meant to be consumed by a ParallaxLayer component via useScroll/useTransform.
export const slowParallax = {
  rangeY: [-40, 40], // px of drift across a scene's scroll range
  ease: ease.soft,
};

// Single full-bleed image growth — used once per scene at most, per the
// Scene Map (Journey → Milestones, Work, Creative Side).
export const imageExpand = {
  hidden: { scale: 1.05, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: duration.slow, ease: ease.cinematic },
  },
};

// Cross-scene blend — owned by the atmosphere layer (GradientLight /
// FadeBlend), not by individual scenes animating their own background.
export const opacityBlend = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.ambient, ease: ease.soft },
  },
};

// Stagger wrapper — a scene wraps its children in one parent variant using
// this instead of hand-timing each child individually.
export function staggerContainer(stagger = 0.15, delayChildren = 0) {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

// Strips any variant down to a plain, fast opacity fade when reduced motion
// is preferred. A single switch here, rather than a per-scene check —
// see Architecture §3.
export function getMotionVariant(variant, reducedMotion) {
  if (!reducedMotion) return variant;
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration.fast } },
  };
}

const motionTokens = {
  ease,
  duration,
  fadeIn,
  revealUp,
  textReveal,
  slowParallax,
  imageExpand,
  opacityBlend,
  staggerContainer,
  getMotionVariant,
};

export default motionTokens;
