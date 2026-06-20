// scenes/02-Identity/Identity.jsx
//
// Scene 2 — Identity. Per the Scene Map: introduce the human, not the
// résumé. No titles, no skill list, no technology names, no timeline, no
// achievements — those stay withheld until later scenes. Just an editorial
// statement about mindset.
//
// Integration notes:
//   - Wrapped in the existing SceneWrapper (id="identity"), same pattern
//     as Arrival — registers with SceneContext's shared scroll observer,
//     gets min-h-dvh layout.
//   - Reads `reducedMotion` from SceneContext, same as Arrival.
//   - Composes directly from theme/motion.js variants/tokens — shared
//     primitives (Heading, RevealOnScroll) still aren't built yet, so
//     this is the second file in line to refactor onto them once they
//     exist.
//   - Unlike Arrival, this scene uses `whileInView` instead of `animate`
//     on mount: Arrival is visible the instant the page loads, but
//     Identity sits below the fold, and every scene mounts together up
//     front (App.jsx renders the full sequence at once) — so without
//     whileInView, the reveal would fire off-screen and the text would
//     already be sitting there fully visible by the time it scrolls into
//     view. `viewport={{ once: true }}` keeps it from replaying on
//     scroll-back, matching the rest of the site's reveal behavior.
//   - No background texture here (unlike Arrival), no card, no border —
//     per Visual Direction this scene is built entirely from space and
//     type. The global GradientLight remains the only atmosphere element
//     and is untouched by this file.
//   - The text block is deliberately offset left on larger viewports
//     rather than centered full-width like Arrival's hero — per Visual
//     Direction, "text never spans full width." This asymmetry is also
//     what makes the scene read as a new scene rather than a repeat of
//     Arrival's layout.

import { motion } from 'framer-motion';
import { SceneWrapper } from '../../components/layout/SceneWrapper.jsx';
import { useSceneContext } from '../../context/SceneContext.jsx';
import { fadeIn, revealUp, staggerContainer, getMotionVariant } from '../../theme/motion.js';
import { identityContent } from './Identity.content.js';

export function Identity() {
  const { reducedMotion } = useSceneContext();

  return (
    <SceneWrapper id="identity">
      <motion.div
        variants={staggerContainer(0.25, 0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 mx-auto w-full max-w-xl px-6 sm:px-10 lg:mx-0 lg:ml-[12%]"
      >
        <motion.p
          variants={getMotionVariant(revealUp, reducedMotion)}
          className="font-display text-display font-medium leading-tight text-primary"
        >
          {identityContent.statement}
        </motion.p>

        <motion.p
          variants={getMotionVariant(fadeIn, reducedMotion)}
          className="mt-md max-w-md font-body text-body text-secondary"
        >
          {identityContent.supportingLine}
        </motion.p>
      </motion.div>
    </SceneWrapper>
  );
}

export default Identity;