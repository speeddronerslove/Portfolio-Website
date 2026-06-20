// scenes/04-Milestones/Milestones.jsx
//
// Scene 4 — Milestones. Per the Scene Map: the first hard proof, the
// "wait, he did that?" beat — one fact, full attention, nothing else
// competing for it. No achievements grid, no stat counters, no award
// cards, no certificate section.
//
// Integration notes:
//   - Wrapped in the existing SceneWrapper (id="milestones"), same
//     registration/min-height pattern as every prior scene.
//   - Single viewport (min-h-dvh), not a tall scroll-driver like Journey.
//     Journey needed extra scroll height because it had three narrative
//     beats unfolding gradually; this scene is the opposite move — a
//     single fact landing all at once is what makes it hit as a reveal
//     rather than information, so it uses one whileInView-triggered
//     stagger cascade instead.
//   - The headline reuses theme/motion.js's `imageExpand` variant rather
//     than `revealUp`. That variant's own doc comment already names this
//     scene as one of its intended uses ("Journey → Milestones, Work,
//     Creative Side") — applying its scale+fade growth to text instead of
//     an image is what makes the headline read as a reveal instead of a
//     statement.
//   - "Full-width imagery if available (the work itself, not a
//     certificate scan)" per the Scene Map: no real photography/render of
//     the award-winning work exists yet, and unlike Journey's abstract
//     wireframe (which stood in for a concept), faking a generic visual
//     here would misrepresent specific proof content. So this scene's
//     "full-width visual area" is the full-bleed accent line below,
//     deliberately left unconstrained by the content padding everything
//     else uses — when real photography/footage of the work exists, it
//     belongs directly under the headline, replacing or supplementing
//     that line.
//   - A subtle desaturation on scroll-out (grayscale via local scroll
//     progress) implements the Scene Map's documented transition note
//     for this exact scene: "the achievement visual holds, then slowly
//     desaturates." reducedMotion disables it, leaving the content at
//     full color throughout.
//   - This scene also adds one entry to the shared
//     atmosphere/GradientLight.jsx intensity map — "orange atmosphere
//     becomes more noticeable" continues the same per-scene intensity
//     mechanism Journey introduced, not a new one.

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SceneWrapper } from '../../components/layout/SceneWrapper.jsx';
import { useSceneContext } from '../../context/SceneContext.jsx';
import {
  fadeIn,
  imageExpand,
  staggerContainer,
  getMotionVariant,
  duration,
  ease,
} from '../../theme/motion.js';
import { milestonesContent } from './Milestones.content.js';

// The accent line draws left-to-right rather than just fading — built from
// the same duration/ease tokens as everything else, with a transform
// (scaleX) that fadeIn/revealUp don't carry.
const lineDraw = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: duration.slow, ease: ease.cinematic },
  },
};

export function Milestones() {
  const containerRef = useRef(null);
  const { reducedMotion } = useSceneContext();

  // Local scroll progress for the exit/desaturation effect only — tracks
  // from roughly the moment this scene starts leaving the top of the
  // viewport through to fully gone.
  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ['center start', 'end start'],
  });
  const grayscaleAmount = useTransform(exitProgress, [0, 1], [0, 1]);
  const filter = useTransform(grayscaleAmount, (value) => `grayscale(${value})`);

  return (
    <SceneWrapper id="milestones">
      <motion.div
        ref={containerRef}
        style={{ filter: reducedMotion ? 'none' : filter }}
        variants={staggerContainer(0.35, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="relative z-10 flex w-full flex-col items-center text-center"
      >
        <motion.p
          variants={getMotionVariant(fadeIn, reducedMotion)}
          className="px-6 font-utility text-caption uppercase tracking-[0.3em] text-secondary sm:px-10 lg:px-16"
        >
          {milestonesContent.eyebrow}
        </motion.p>

        {/* Full-bleed accent line — the scene's "full-width visual area."
            Deliberately unconstrained by the horizontal padding the text
            elements use, so it reads as a distinct graphic moment rather
            than another line of content. */}
        <motion.div
          variants={getMotionVariant(lineDraw, reducedMotion)}
          style={{ transformOrigin: 'left' }}
          className="my-md h-px w-full bg-accent-1 opacity-70"
        />

        <motion.h2
          variants={getMotionVariant(imageExpand, reducedMotion)}
          className="px-6 font-display text-hero font-bold uppercase leading-[0.92] tracking-tight text-primary sm:px-10 lg:px-16"
        >
          {milestonesContent.headline}
        </motion.h2>

        <motion.p
          variants={getMotionVariant(fadeIn, reducedMotion)}
          className="mt-md px-6 font-body text-body text-secondary sm:px-10 lg:px-16"
        >
          {milestonesContent.caption}
        </motion.p>
      </motion.div>
    </SceneWrapper>
  );
}

export default Milestones;