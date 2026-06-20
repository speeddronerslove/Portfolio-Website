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
//   - Converted to a dedicated Sticky Storytelling System with static viewport lockdown.
//   - Uses an expanded 250vh track coupled with theme/motion.js springConfig to stabilize
//     reading time and implement Sanctuary reading plateaus under continuous scroll.
//   - FIXES ACCIDENTALLY INJECTED BACKGROUND COVERS: Stripped absolute colored fields; 
//     now integrates seamlessly with the global multi-scene atmosphere context.
//   - A subtle desaturation on scroll-out (grayscale via local scroll
//     progress) implements the Scene Map's documented transition note.
//   - reducedMotion disables it, leaving the content at full color throughout.

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SceneWrapper } from '../../components/layout/SceneWrapper.jsx';
import { useSceneContext } from '../../context/SceneContext.jsx';
import { springConfig } from '../../theme/motion.js';
import { milestonesContent } from './Milestones.content.js';

export function Milestones() {
  const containerRef = useRef(null);
  const { reducedMotion } = useSceneContext();
  
  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth out raw scroll tracks with inertial dampening springs
  const progress = useSpring(rawProgress, springConfig.atmosphere);

  // Sanctuary Reading Zone Mapping: Locks visibility and reading real estate from 0.20 to 0.80
  const contentOpacity = useTransform(progress, [0.0, 0.20, 0.80, 1.0], [0, 1, 1, 0]);
  const contentScale = useTransform(progress, [0.0, 0.20, 0.80, 1.0], [0.97, 1, 1, 0.97]);
  const lineDrawWidth = useTransform(progress, [0.0, 0.35], ["0%", "100%"]);
  
  // Exit desaturation track sync
  const grayscaleAmount = useTransform(progress, [0.75, 1.0], [0, 1]);
  const filter = useTransform(grayscaleAmount, (value) => `grayscale(${value})`);

  return (
    <SceneWrapper id="milestones">
      <div ref={containerRef} className="relative h-[250vh] w-full">
        <div className="sticky top-0 flex h-dvh w-full flex-col justify-center overflow-hidden">
          <motion.div
            style={{ 
              opacity: contentOpacity, 
              scale: reducedMotion ? 1 : contentScale,
              filter: reducedMotion ? 'none' : filter 
            }}
            className="relative z-10 flex w-full flex-col items-center text-center select-none tracking-tighter"
          >
            <p className="px-6 font-utility text-caption uppercase tracking-[0.3em] text-secondary sm:px-10 lg:px-16">
              {milestonesContent.eyebrow}
            </p>
            
            {/* Synchronizing standard accent line draw to scroll parameters */}
            <motion.div
              style={{ width: reducedMotion ? "100%" : lineDrawWidth, transformOrigin: 'left' }}
              className="my-8 h-px bg-accent-1 opacity-70"
            />
            
            <h2 className="px-6 font-display text-hero font-black uppercase leading-[0.92] tracking-tight text-primary sm:px-10 lg:px-16">
              {milestonesContent.headline}
            </h2>
            
            <p className="mt-8 px-6 font-body text-body text-secondary sm:px-10 lg:px-16">
              {milestonesContent.caption}
            </p>
          </motion.div>
        </div>
      </div>
    </SceneWrapper>
  );
}

export default Milestones;