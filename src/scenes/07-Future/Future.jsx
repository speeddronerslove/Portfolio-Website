// scenes/07-Future/Future.jsx
// Scene 7 — Future. Shifts the narrative arc from proof to anticipation.
// Built with maximum white space and intense structural restraint.
// Zero timelines, zero roadmap indicators, zero technology grids.

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
import { futureContent } from './Future.content.js';

export function Future() {
  const containerRef = useRef(null);
  const { reducedMotion } = useSceneContext();

  // Local scroll metrics for the exit desaturation mapping
  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ['center start', 'end start'],
  });

  const grayscaleAmount = useTransform(exitProgress, [0, 1], [0, 1]);
  const filter = useTransform(grayscaleAmount, (value) => `grayscale(${value})`);

  return (
    <SceneWrapper id="future">
      <motion.div
        ref={containerRef}
        style={{ filter: reducedMotion ? 'none' : filter }}
        variants={staggerContainer(0.3, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 flex w-full min-h-screen flex-col justify-center items-start px-6 sm:px-10 lg:px-16 select-none tracking-tighter text-left"
      >
        {/* Atmosphere: Orange light source fades back, becoming incredibly faint and deep */}
        <div 
          className="absolute right-[10%] bottom-[20%] w-[50vw] h-[50vw] rounded-full pointer-events-none blur-[250px] opacity-[0.03] z-0"
          style={{
            background: 'radial-gradient(circle, #E64500 0%, #2A0000 70%, transparent 100%)'
          }}
        />

        <div className="w-full max-w-4xl mx-auto z-10 flex flex-col items-start relative">
          
          {/* Eyebrow */}
          <motion.p
            variants={getMotionVariant(fadeIn, reducedMotion)}
            className="font-utility text-caption uppercase tracking-[0.3em] text-secondary pl-2"
          >
            {futureContent.eyebrow}
          </motion.p>

          {/* Large Editorial Headline */}
          <motion.h2
            variants={getMotionVariant(imageExpand, reducedMotion)}
            className="w-full text-left font-display text-hero font-black uppercase leading-[0.92] text-primary mt-6 mb-12 pl-2"
          >
            {futureContent.headline}
          </motion.h2>

          {/* Vision Statement Narrative Line */}
          <motion.div
            variants={getMotionVariant(fadeIn, reducedMotion)}
            className="max-w-2xl border-l border-white/10 pl-6 md:pl-10 mt-4"
          >
            <p className="text-secondary font-body text-xl sm:text-2xl font-light tracking-wide leading-relaxed">
              {futureContent.vision}
            </p>
          </motion.div>

        </div>
      </motion.div>
    </SceneWrapper>
  );
}

export default Future;