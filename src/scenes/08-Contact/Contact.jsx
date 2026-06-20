// scenes/08-Contact/Contact.jsx
// Scene 8 — Contact. The closing echo of the portfolio architecture.
// Returns to the absolute stillness and pure text focus of Scene 1.
// Explicitly avoids inputs, custom contact forms, or icon grid arrays.

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SceneWrapper } from '../../components/layout/SceneWrapper.jsx';
import { useSceneContext } from '../../context/SceneContext.jsx';
import {
  fadeIn,
  imageExpand,
  staggerContainer,
  getMotionVariant
} from '../../theme/motion.js';
import { contactContent } from './Contact.content.js';

export function Contact() {
  const containerRef = useRef(null);
  const { reducedMotion } = useSceneContext();

  return (
    <SceneWrapper id="contact">
      <motion.div
        ref={containerRef}
        variants={staggerContainer(0.25, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="relative z-10 flex w-full h-screen flex-col justify-between p-8 md:p-24 overflow-hidden select-none tracking-tighter text-center"
      >
        {/* Top Spacer to align layout framing perfectly with Scene 1 */}
        <div className="w-full" />

        {/* Master Center Display Block */}
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center z-10">
          {/* Quieter echo of the primary Display Name */}
          <motion.h2
            variants={getMotionVariant(imageExpand, reducedMotion)}
            className="font-display text-5xl sm:text-7xl font-black uppercase tracking-tight text-primary mb-4"
          >
            {contactContent.headline}
          </motion.h2>

          {/* Short Closing Statement */}
          <motion.p
            variants={getMotionVariant(fadeIn, reducedMotion)}
            className="font-body text-md sm:text-lg font-light tracking-[0.2em] uppercase text-secondary mb-16"
          >
            {contactContent.closing}
          </motion.p>

          {/* Minimal Navigation Channels — Text lists instead of social icon layouts */}
          <motion.div 
            variants={staggerContainer(0.15, 0.05)}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12"
          >
            {contactContent.links.map((link) => (
              <motion.a
                key={link.label}
                variants={getMotionVariant(fadeIn, reducedMotion)}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-utility text-sm uppercase tracking-[0.25em] text-secondary hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Static Bottom Frame Element maintaining perfect visual equilibrium */}
        <div className="w-full text-center">
          <span className="text-secondary opacity-20 font-utility text-[10px] tracking-[0.4em] uppercase">
            © 2026 All Rights Reserved
          </span>
        </div>
      </motion.div>
    </SceneWrapper>
  );
}

export default Contact;