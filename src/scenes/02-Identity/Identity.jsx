// scenes/02-Identity/Identity.jsx
//
// Scene 2 — Identity. Per the Scene Map: introduce the human, not the
// résumé. No titles, no skill list, no technology names, no timeline, no
// achievements — those stay withheld until later scenes. Just an editorial
// statement about mindset.
//
// Integration notes:
//   - Wrapped in the existing SceneWrapper (id="identity"), same pattern
//     as Arrival — registers with SceneContext's shared scroll observer.
//   - CONTINUITY FIX: Preserves the natural document height pattern instead of locking 
//     the screen down via sticky boxes, removing structural inconsistency.
//   - Tracks element viewport entry/exit progression via container level useScroll.
//   - Text fragments smoothly fade out on exit, matching the atmospheric fade rules 
//     of subsequent scenes.
//   - MAINTAINS ASYMMETRY LAYOUT: Content remains deliberately offset left on larger
//     viewports (`lg:mx-0 lg:ml-[12%]`) and never spans full-width.

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SceneWrapper } from '../../components/layout/SceneWrapper.jsx';
import { useSceneContext } from '../../context/SceneContext.jsx';
import { springConfig } from '../../theme/motion.js';
import { identityContent } from './Identity.content.js';

export function Identity() {
  const elementRef = useRef(null);
  const { reducedMotion } = useSceneContext();

  // Track the absolute scroll position of this container relative to the viewport window
  const { scrollYProgress: rawProgress } = useScroll({
    target: elementRef,
    offset: ['start end', 'end start'],
  });

  // Inertial dampening spring to match global atmosphere response
  const progress = useSpring(rawProgress, springConfig.atmosphere);

  // Structural Spatial Intersection Mapping:
  // - Enters completely faded in near the top center of its arrival
  // - Gracefully de-escalates and blends away into the background canvas as it exits upward
  const contentOpacity = useTransform(progress, [0.0, 0.25, 0.65, 0.90], [0, 1, 1, 0]);
  const contentY = useTransform(progress, [0.0, 0.25, 0.65, 0.90], [30, 0, 0, -30]);

  return (
    <SceneWrapper id="identity">
      <div 
        ref={elementRef} 
        className="relative min-h-dvh w-full flex items-center justify-start bg-transparent py-24 px-6 sm:px-10"
      >
        <motion.div
          style={{ 
            opacity: contentOpacity, 
            y: reducedMotion ? 0 : contentY 
          }}
          className="relative z-10 w-full max-w-xl mx-auto lg:mx-0 lg:ml-[12%] select-none tracking-tighter"
        >
          {/* Mindset Editorial Statement */}
          <p className="font-display text-display font-medium leading-tight text-primary">
            {identityContent.statement}
          </p>

          {/* Supporting Context */}
          <p className="mt-md max-w-md font-body text-body text-secondary">
            {identityContent.supportingLine}
          </p>
        </motion.div>
      </div>
    </SceneWrapper>
  );
}

export default Identity;