// scenes/06-CreativeSide/CreativeSide.jsx
//
// Scene 6 — Creative Side. The peak emotional and structural reveal (The Climax).
// Implements the approved premium layout framework: rgba card rules used sparingly,
// high orange light intensity atmosphere, and zero traditional grid lists.
//
// Integration notes:
//   - Converted into a high-fidelity Sticky Storytelling System spanning 350vh.
//   - Employs dedicated springConfig transforms to safeguard reading time over core sections.
//   - Stages narrative plateaus: base text renders first, signature showcase container follows.
//   - REMOVES COMPETING HARD-BLACK BACKGROUND WRAPPERS: Allows global environment colors 
//     and atmospheric canvas transitions to merge exactly as established in early architecture blocks.

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SceneWrapper } from '../../components/layout/SceneWrapper.jsx';
import { useSceneContext } from '../../context/SceneContext.jsx';
import { springConfig } from '../../theme/motion.js';
import { creativeSideContent } from './CreativeSide.content.js';

export function CreativeSide() {
  const containerRef = useRef(null);
  const { reducedMotion } = useSceneContext();

  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Decoupled spring interpolation layer
  const progress = useSpring(rawProgress, springConfig.atmosphere);

  // Overlapping Sanctuary Reading Plates
  const globalOpacity = useTransform(progress, [0.0, 0.15, 0.85, 1.0], [0, 1, 1, 0]);
  const pillarOpacity = useTransform(progress, [0.10, 0.25, 0.85, 0.95], [0, 1, 1, 0]);
  const showcaseOpacity = useTransform(progress, [0.35, 0.50, 0.90, 1.0], [0, 1, 1, 0]);
  const showcaseScale = useTransform(progress, [0.35, 0.50, 0.90, 1.0], [0.96, 1, 1, 0.98]);

  // Atmospheric micro-scaling and desaturation controls
  const filter = useTransform(useTransform(progress, [0.85, 1.0], [0, 1]), (v) => `grayscale(${v})`);

  return (
    <SceneWrapper id="creative-side">
      <div ref={containerRef} className="relative h-[350vh] w-full">
        <div className="sticky top-0 flex h-dvh w-full flex-col justify-center overflow-hidden">
          <motion.div
            style={{ opacity: globalOpacity, filter: reducedMotion ? 'none' : filter }}
            className="relative z-10 flex w-full flex-col items-center text-center px-6 sm:px-10 lg:px-16 select-none tracking-tighter"
          >
            <div className="w-full max-w-7xl mx-auto z-10 flex flex-col items-center text-center relative">
              
              <p className="font-utility text-caption uppercase tracking-[0.3em] text-secondary">
                {creativeSideContent.eyebrow}
              </p>

              <h2 className="w-full text-center font-display text-hero font-black uppercase leading-[0.92] text-primary mt-6 mb-16">
                {creativeSideContent.headline}
              </h2>

              {/* Core Pillars Section */}
              <motion.div 
                style={{ opacity: pillarOpacity }}
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mb-16 text-left"
              >
                {creativeSideContent.sections.map((sec) => (
                  <div key={sec.id} className="border-t border-white/10 pt-6">
                    <h3 className="text-primary font-display text-xl font-bold uppercase tracking-tight mb-3">
                      {sec.title}
                    </h3>
                    <p className="text-secondary font-body text-lg font-light tracking-wide leading-relaxed">
                      {sec.description}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* HapticVerse Premium Card Container Component */}
              <motion.div
                style={{ 
                  opacity: showcaseOpacity, 
                  scale: reducedMotion ? 1 : showcaseScale 
                }}
                className="w-full max-w-5xl text-left bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[32px] p-8 md:p-12 backdrop-blur-md"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                  <div className="max-w-xs">
                    <span className="text-[#FF7A00] font-utility text-xs tracking-[0.4em] uppercase block mb-2">
                      {creativeSideContent.climax.tagline}
                  </span>
                    <h4 className="text-primary font-display text-4xl sm:text-5xl font-black uppercase tracking-tighter">
                      {creativeSideContent.climax.title}
                    </h4>
                  </div>
                  <div className="max-w-xl border-l-0 md:border-l border-white/10 md:pl-12">
                    <p className="text-primary font-body text-xl font-light tracking-wide leading-relaxed">
                      {creativeSideContent.climax.description}
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </SceneWrapper>
  );
}

export default CreativeSide;