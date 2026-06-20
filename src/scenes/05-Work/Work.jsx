// scenes/05-Work/Work.jsx
// Scene 5 — Work. Matches past architecture: cleanly structured, editorial layout,
// single-viewport stagger cascade (min-h-dvh) following the non-scroll-driver pattern.
// Completely free of tech-stack grids, progress indicators, or portfolio cards.

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
import { workContent } from './Work.content.js';

// Custom left-to-right border draw mimicking the established Milestones line token
const lineDraw = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: duration.slow, ease: ease.cinematic }
  }
};

export function Work() {
  const containerRef = useRef(null);
  const { reducedMotion } = useSceneContext();

  // Local scroll progress for subtle exit desaturation mapping Scene 5 transitions
  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ['center start', 'end start']
  });

  const grayscaleAmount = useTransform(exitProgress, [0, 1], [0, 1]);
  const filter = useTransform(grayscaleAmount, (value) => `grayscale(${value})`);

  return (
    <SceneWrapper id="work">
      <motion.div
        ref={containerRef}
        style={{ filter: reducedMotion ? 'none' : filter }}
        variants={staggerContainer(0.25, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 flex w-full flex-col items-start text-left px-6 sm:px-10 lg:px-16 select-none tracking-tighter"
      >
        {/* Editorial Eyebrow */}
        <motion.p
          variants={getMotionVariant(fadeIn, reducedMotion)}
          className="font-utility text-caption uppercase tracking-[0.3em] text-secondary pl-2"
        >
          {workContent.eyebrow}
        </motion.p>

        {/* Cinematic Headline leveraging the imageExpand scaling reveal variant */}
        <motion.h2
          variants={getMotionVariant(imageExpand, reducedMotion)}
          className="w-full text-left font-display text-hero font-black uppercase leading-[0.92] text-primary mt-6 mb-20 pl-2"
        >
          {workContent.headline}
        </motion.h2>

        {/* Vertical Pillar Pipeline Layout */}
        <div className="w-full flex flex-col gap-24 pl-2">
          {workContent.pillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              variants={staggerContainer(0.2, 0.05)}
              className="w-full max-w-5xl border-t border-white/10 pt-10 grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              {/* Pillar Title */}
              <motion.div 
                variants={getMotionVariant(fadeIn, reducedMotion)}
                className="md:col-span-4"
              >
                <h3 className="text-primary font-display text-2xl font-bold uppercase tracking-tight">
                  {pillar.title}
                </h3>
              </motion.div>

              {/* Pillar Narrative Block */}
              <motion.div 
                variants={getMotionVariant(fadeIn, reducedMotion)}
                className="md:col-span-8"
              >
                <p className="text-secondary font-body text-xl font-light tracking-wide leading-relaxed max-w-2xl">
                  {pillar.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SceneWrapper>
  );
}

export default Work;