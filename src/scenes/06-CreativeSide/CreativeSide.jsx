// scenes/06-CreativeSide/CreativeSide.jsx
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

  const progress = useSpring(rawProgress, springConfig.atmosphere);

  // --- PHASE 1: Core Pillars Introduction ---
  const pillarsOpacity = useTransform(progress, [0.0, 0.1, 0.40, 0.48], [0, 1, 1, 0]);
  const pillarsY = useTransform(progress, [0.0, 0.1, 0.40, 0.48], [25, 0, 0, -25]);

  // --- PHASE 2: Fused Title + HapticVerse Climax Showcase ---
  const showcaseOpacity = useTransform(progress, [0.48, 0.58, 0.90, 0.98], [0, 1, 1, 0]);
  const showcaseY = useTransform(progress, [0.48, 0.58, 0.90, 0.98], [30, 0, 0, -25]);
  const showcaseScale = useTransform(progress, [0.48, 0.58, 0.90, 0.98], [0.98, 1, 1, 0.98]);

  const filter = useTransform(useTransform(progress, [0.90, 0.98], [0, 1]), (v) => `grayscale(${v})`);

  return (
    <SceneWrapper id="creative-side">
      <div ref={containerRef} className="relative h-[350vh] w-full bg-transparent">
        <div className="sticky top-0 flex h-dvh w-full items-center justify-center overflow-hidden px-6 sm:px-10 lg:px-16">
          
          <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center min-h-[70vh]">
            
            {/* STAGE 1: Spacious, balanced structural pillars layout */}
            <motion.div
              style={{ 
                opacity: pillarsOpacity, 
                y: reducedMotion ? 0 : pillarsY,
                pointerEvents: useTransform(progress, (v) => v > 0.46 ? 'none' : 'auto')
              }}
              className="absolute inset-0 flex flex-col justify-center items-center text-center select-none tracking-tighter w-full h-full"
            >
              <p className="font-utility text-caption uppercase tracking-[0.3em] text-secondary">
                {creativeSideContent.eyebrow}
              </p>

              <h2 className="w-full text-center font-display text-hero font-black uppercase leading-[0.92] text-primary mt-6 mb-12">
                {creativeSideContent.headline}
              </h2>

              {/* Grid extended across container with responsive column tracks */}
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl px-4">
                {creativeSideContent.sections.map((sec) => (
                  <div key={sec.id} className="border-t border-white/10 pt-5 flex flex-col justify-start">
                    <h3 className="text-primary font-display text-base font-bold uppercase tracking-tight mb-2">
                      {sec.title}
                    </h3>
                    <p className="text-secondary font-body text-sm font-light tracking-wide leading-relaxed opacity-85">
                      {sec.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* STAGE 2: Combined Title + HapticVerse Premium Showcase Layout */}
            <motion.div
              style={{ 
                opacity: showcaseOpacity, 
                y: reducedMotion ? 0 : showcaseY,
                scale: reducedMotion ? 1 : showcaseScale,
                filter: reducedMotion ? 'none' : filter,
                pointerEvents: useTransform(progress, (v) => (v <= 0.46 || v >= 0.96) ? 'none' : 'auto')
              }}
              className="absolute w-full flex flex-col items-center justify-center select-none tracking-tighter"
            >
              <p className="font-utility text-caption uppercase tracking-[0.3em] text-secondary mb-4">
                {creativeSideContent.eyebrow}
              </p>

              <h2 className="w-full text-center font-display text-hero font-black uppercase leading-[0.92] text-primary mb-12">
                {creativeSideContent.headline}
              </h2>

              <div className="w-full text-left bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[32px] p-8 md:p-12 backdrop-blur-md">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                  <div className="max-w-xs shrink-0">
                    <span className="text-[#FF7A00] font-utility text-xs tracking-[0.4em] uppercase block mb-2">
                      {creativeSideContent.climax.tagline}
                    </span>
                    <h4 className="text-primary font-display text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
                      {creativeSideContent.climax.title}
                    </h4>
                  </div>
                  
                  <div className="w-full md:border-l border-white/10 md:pl-10">
                    <p className="text-primary font-body text-lg md:text-xl font-light tracking-wide leading-relaxed">
                      {creativeSideContent.climax.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
          
        </div>
      </div>
    </SceneWrapper>
  );
}

export default CreativeSide;