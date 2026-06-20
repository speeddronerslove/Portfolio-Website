// scenes/06-CreativeSide/CreativeSide.jsx
// Scene 6 — Creative Side. The peak emotional and structural reveal.
// Implements the approved premium layout framework: rgba card rules used sparingly,
// high orange light intensity atmosphere, and zero traditional grid lists.

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
  ease
} from '../../theme/motion.js';
import { creativeSideContent } from './CreativeSide.content.js';

export function CreativeSide() {
  const containerRef = useRef(null);
  const { reducedMotion } = useSceneContext();

  // Local scroll metrics for exit desaturation mapping
  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ['center start', 'end start'],
  });

  const grayscaleAmount = useTransform(exitProgress, [0, 1], [0, 1]);
  const filter = useTransform(grayscaleAmount, (value) => `grayscale(${value})`);

  return (
    <SceneWrapper id="creative-side">
      <motion.div
        ref={containerRef}
        style={{ filter: reducedMotion ? 'none' : filter }}
        variants={staggerContainer(0.25, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 flex w-full flex-col items-center text-center px-6 sm:px-10 lg:px-16 select-none tracking-tighter"
      >
        {/* Peak Atmosphere: Deepest, most noticeable ambient orange light source signature */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[50vh] rounded-full pointer-events-none blur-[220px] opacity-[0.16] z-0"
          style={{
            background: 'radial-gradient(circle, #FF7A00 0%, #E64500 45%, #2A0000 80%, transparent 100%)'
          }}
        />

        <div className="w-full max-w-7xl mx-auto z-10 flex flex-col items-center text-center relative">
          
          {/* Eyebrow */}
          <motion.p
            variants={getMotionVariant(fadeIn, reducedMotion)}
            className="font-utility text-caption uppercase tracking-[0.3em] text-secondary"
          >
            {creativeSideContent.eyebrow}
          </motion.p>

          {/* Climax Main Headline */}
          <motion.h2
            variants={getMotionVariant(imageExpand, reducedMotion)}
            className="w-full text-center font-display text-hero font-black uppercase leading-[0.92] text-primary mt-6 mb-24"
          >
            {creativeSideContent.headline}
          </motion.h2>

          {/* Creative Foundation Pillars */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mb-32 text-left">
            {creativeSideContent.sections.map((sec) => (
              <motion.div
                key={sec.id}
                variants={getMotionVariant(fadeIn, reducedMotion)}
                className="border-t border-white/10 pt-8"
              >
                <h3 className="text-primary font-display text-xl font-bold uppercase tracking-tight mb-4">
                  {sec.title}
                </h3>
                <p className="text-secondary font-body text-lg font-light tracking-wide leading-relaxed">
                  {sec.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* The Peak Showstopper Reveal: HapticVerse Premium Card Container */}
          {/* Strictly follows the authorized blueprint spec: fill, border, 32px radius, large padding */}
          <motion.div
            variants={getMotionVariant(imageExpand, reducedMotion)}
            className="w-full max-w-5xl text-left bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[32px] p-8 md:p-16 backdrop-blur-md"
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
    </SceneWrapper>
  );
}

export default CreativeSide;