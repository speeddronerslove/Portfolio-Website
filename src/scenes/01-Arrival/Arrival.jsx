// scenes/01-Arrival/Arrival.jsx
//
// Scene 1 — Arrival. Per the Scene Map: establish tone before a single
// fact is shared. Name, one line of presence, a faint scroll cue. Nothing
// else — no titles, no imagery, no card, no nav.
//
// Integration notes:
//   - Wrapped in the existing SceneWrapper (registers with SceneContext's
//     shared scroll observer, gets min-h-dvh layout).
//   - Reads `reducedMotion` from SceneContext rather than querying
//     matchMedia itself.
//   - Composes directly from theme/motion.js variants/tokens. The
//     Architecture's shared primitives (Heading, RevealOnScroll,
//     ParallaxLayer) aren't built yet — this file is the natural first
//     candidate to refactor onto them once they exist.
//   - Renders inside <main> (z-10) in ScrollOrchestrator, so the global
//     GradientLight shows through — this scene never sets its own
//     background color.
//   - Gotcha for future scenes: slash-opacity modifiers (e.g. `bg-secondary/40`)
//     silently fail to generate any CSS against these CSS-variable-based
//     colors in this Tailwind setup — verified via a production build.
//     Use a separate `opacity-*` utility instead (e.g. `bg-secondary opacity-40`).

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SceneWrapper } from '../../components/layout/SceneWrapper.jsx';
import { useSceneContext } from '../../context/SceneContext.jsx';
import {
  fadeIn,
  revealUp,
  staggerContainer,
  getMotionVariant,
  duration,
  ease,
} from '../../theme/motion.js';
import { arrivalContent } from './Arrival.content.js';

// Scroll-cue reveal needs a delay the shared fadeIn variant doesn't carry
// (delay is scene-specific orchestration, not a shared timing value) —
// built from the same duration/ease tokens rather than inventing a curve.
const scrollCueReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: ease.cinematic, delay: 1.4 },
  },
};

export function Arrival() {
  const containerRef = useRef(null);
  const { reducedMotion } = useSceneContext();

  // Local scroll progress for this scene only — drives the background
  // texture drift. Per Scene Map Visual Direction: "slow parallax drift on
  // background texture only, nothing else moves."
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const textureY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <SceneWrapper id="arrival">
      <div ref={containerRef} className="relative h-full w-full overflow-hidden">
        {/* Background texture: faint film grain, the only element that
            drifts independently of the text. No external asset — generated
            inline so the scene has no asset dependency before art exists. */}
        <motion.svg
          aria-hidden="true"
          width="100%"
          height="100%"
          className="pointer-events-none absolute -inset-y-16 inset-x-0 z-0 opacity-[0.035]"
          style={{ y: reducedMotion ? 0 : textureY }}
        >
          <filter id="arrival-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#arrival-grain)" />
        </motion.svg>

        {/* Hero content */}
        <motion.div
          variants={staggerContainer(0.2, 0.1)}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center sm:px-10 lg:px-16"
        >
          <motion.h1
            variants={getMotionVariant(revealUp, reducedMotion)}
            className="font-display text-hero font-bold uppercase leading-[0.92] tracking-tight text-primary"
          >
            {arrivalContent.name}
          </motion.h1>

          <motion.p
            variants={getMotionVariant(fadeIn, reducedMotion)}
            className="mt-md max-w-md font-body text-body text-secondary"
          >
            {arrivalContent.statement}
          </motion.p>
        </motion.div>

        {/* Scroll cue: opacity only, no bounce or float — Design Bible's
            forbidden animation list excludes any positional motion here. */}
        <motion.div
          variants={getMotionVariant(scrollCueReveal, reducedMotion)}
          initial="hidden"
          animate="visible"
          className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <motion.span
            animate={
              reducedMotion ? { opacity: 0.4 } : { opacity: [0.25, 0.55, 0.25] }
            }
            transition={
              reducedMotion ? undefined : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
            }
            className="font-utility text-caption uppercase tracking-[0.3em] text-secondary"
          >
            {arrivalContent.scrollCue}
          </motion.span>
          <span aria-hidden="true" className="h-10 w-px bg-secondary opacity-40" />
        </motion.div>
      </div>
    </SceneWrapper>
  );
}

export default Arrival;
