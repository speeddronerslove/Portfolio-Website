// scenes/03-Journey/Journey.jsx
//
// Scene 3 — Journey. Per the Scene Map: the path that built him, told as a
// short narrative arc — not a timeline, not numbered steps, not a card.
// Per this scene's brief: childhood fascination with computers and games,
// curiosity becoming creation, discovering development and 3D art. No
// achievements, no Gold Medal, no HapticVerse — those stay withheld for
// later scenes.
//
// Integration notes:
//   - Wrapped in the existing SceneWrapper (id="journey"), same
//     registration/min-height pattern as Arrival and Identity.
//   - This is the first scene that needs more than one viewport of scroll
//     to do its job (three sequential reveals + one image-expansion
//     moment). Its child is a tall driver div (300dvh) with a sticky
//     pinned viewport inside it. SceneWrapper's own min-h-dvh is just a
//     floor — the <section> grows to fit this child naturally, nothing
//     needed to override it.
//   - Text fragments crossfade in place (opacity/y driven by this scene's
//     own local scroll progress) rather than using the stagger/variant
//     pattern from Arrival and Identity. "Each replacing the last, not
//     stacked" is a continuous scroll-bound effect — theme/motion.js's
//     discrete viewport-enter variants don't express that, so this scene
//     uses useScroll/useTransform directly, the same primitive the
//     architecture's (not-yet-built) ParallaxLayer would eventually wrap.
//   - The single visual moment is a generated low-poly wireframe — no
//     external asset exists yet, so nothing here references a file that
//     isn't there. Same reasoning as Arrival's grain texture. Swap the
//     <svg> block for real artwork once it exists.
//   - reducedMotion strips the reveal y-shift and the image's scale
//     growth, leaving plain opacity crossfades — consistent with how
//     Arrival and Identity degrade.
//
// This scene also required a small, deliberate change to the shared
// atmosphere/GradientLight.jsx — see that file's comments. "Orange light
// grows slightly stronger than Scene 2" isn't something a single scene
// can do on its own without breaking the rule that GradientLight is the
// only place the accent gradient gets painted, so GradientLight now reads
// a per-scene intensity value instead of guessing from raw scroll
// percentage (which would silently break every time a new scene changes
// total page height).

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SceneWrapper } from '../../components/layout/SceneWrapper.jsx';
import { useSceneContext } from '../../context/SceneContext.jsx';
import { journeyContent } from './Journey.content.js';

// Scroll ranges (0–1 across this scene's own 300dvh) for each text
// fragment: fade in, hold, fade out, with a slight overlap into the next
// fragment's fade-in for a smooth crossfade. These are scene-local
// orchestration values, not shared design tokens.
const FRAGMENT_RANGES = [
  [0, 0.07, 0.21, 0.29],
  [0.27, 0.35, 0.49, 0.57],
  [0.55, 0.63, 0.73, 0.79],
];

function useFragmentTransform(progress, range, reducedMotion) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [16, 0, 0, -16]);
  return { opacity, y: reducedMotion ? 0 : y };
}

export function Journey() {
  const driverRef = useRef(null);
  const { reducedMotion } = useSceneContext();

  const { scrollYProgress: progress } = useScroll({
    target: driverRef,
    offset: ['start start', 'end end'],
  });

  const fragment1 = useFragmentTransform(progress, FRAGMENT_RANGES[0], reducedMotion);
  const fragment2 = useFragmentTransform(progress, FRAGMENT_RANGES[1], reducedMotion);
  const fragment3 = useFragmentTransform(progress, FRAGMENT_RANGES[2], reducedMotion);

  // The visual moment: fades and grows in as the last fragment trails off,
  // arriving at full size right where the scene ends — "pulling toward an
  // image that expands to fill the frame" per the Scene Map's transition note.
  const imageOpacity = useTransform(progress, [0.74, 0.92], [0, 1]);
  const imageScale = useTransform(progress, [0.74, 1], reducedMotion ? [1, 1] : [0.88, 1.06]);

  return (
    <SceneWrapper id="journey">
      <div ref={driverRef} className="relative h-[300dvh] w-full">
        <div className="sticky top-0 flex h-dvh w-full items-center justify-center overflow-hidden px-6 sm:px-10 lg:px-16">
          {/* Sequential text — each fragment occupies the same position
              and crossfades in place rather than stacking below the last. */}
          <motion.p
            style={{ opacity: fragment1.opacity, y: fragment1.y }}
            className="absolute max-w-xl text-center font-display text-heading font-medium leading-snug text-primary"
          >
            {journeyContent.fragments[0]}
          </motion.p>

          <motion.p
            style={{ opacity: fragment2.opacity, y: fragment2.y }}
            className="absolute max-w-xl text-center font-display text-heading font-medium leading-snug text-primary"
          >
            {journeyContent.fragments[1]}
          </motion.p>

          <motion.p
            style={{ opacity: fragment3.opacity, y: fragment3.y }}
            className="absolute max-w-xl text-center font-display text-heading font-medium leading-snug text-primary"
          >
            {journeyContent.fragments[2]}
          </motion.p>

          {/* The one strong visual moment — a generated wireframe form,
              expanding as the narrative arrives somewhere concrete. Two
              edges carry the accent color: the only place in this scene
              that touches the gradient palette, deliberately restrained
              rather than washing the shape in orange. */}
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 400 400"
            style={{ opacity: imageOpacity, scale: imageScale }}
            className="absolute h-[60vmin] w-[60vmin] max-h-[440px] max-w-[440px]"
          >
            <g fill="none" strokeWidth="1.2" strokeLinecap="round">
              <polyline
                points="200,60 80,150 200,110 320,150 200,60 320,150 320,250 200,60"
                stroke="var(--color-text-primary)"
                strokeOpacity="0.3"
              />
              <polyline
                points="200,340 80,250 200,290 320,250 200,340 80,250 80,150"
                stroke="var(--color-text-primary)"
                strokeOpacity="0.3"
              />
              <polyline
                points="80,150 80,250 200,290 320,250 320,150 200,110 80,150"
                stroke="var(--color-text-secondary)"
                strokeOpacity="0.4"
              />
              <line x1="200" y1="60" x2="200" y2="110" stroke="var(--color-accent-1)" strokeOpacity="0.7" />
              <line x1="200" y1="290" x2="200" y2="340" stroke="var(--color-accent-1)" strokeOpacity="0.7" />
            </g>
          </motion.svg>
        </div>
      </div>
    </SceneWrapper>
  );
}

export default Journey;