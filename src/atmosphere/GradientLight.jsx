import { useEffect } from 'react';
import { motion, useTransform, useMotionValue, animate } from 'framer-motion';
import { useSceneContext } from '../context/SceneContext.jsx';

// The single persistent "light source" described in the Design Bible:
// "orange is not a theme color, orange behaves like a light source."
const SCENE_INTENSITY = {
  arrival: 0.5,
  identity: 0.62,
  journey: 0.78,
  milestones: 0.88,
  work: 0.92,
  'creative-side': 1.0,
  future: 0.45,
  contact: 0.05,
};
const DEFAULT_INTENSITY = 0.5;

export function GradientLight() {
  const { scrollProgress, activeSceneId, reducedMotion } = useSceneContext();

  // Smooth cinematic drift across the page height
  const driftTop = useTransform(scrollProgress, [0, 1], ['20%', '80%']);

  const intensity = useMotionValue(SCENE_INTENSITY.arrival);

  useEffect(() => {
    const target =
      (activeSceneId && SCENE_INTENSITY[activeSceneId]) ?? DEFAULT_INTENSITY;
    const controls = animate(intensity, target, {
      duration: reducedMotion ? 0 : 1.2,
      ease: [0.4, 0, 0.2, 1],
    });
    return () => controls.stop();
  }, [activeSceneId, intensity, reducedMotion]);

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden bg-[#0a0503]">
      <motion.div
        // UPGRADED SPREAD: Increased from 60vmax to 95vmax and boosted blur radius 
        // to match the deep cinematic bleed seen in image_0a9c39.png.
        className="absolute left-1/2 h-[95vmax] w-[95vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px] mix-blend-screen"
        style={{
          top: reducedMotion ? '50%' : driftTop,
          opacity: intensity,
          // CINEMATIC COLOURED STOPS: Fuses hot glowing orange-red (#FF4B1F) directly 
          // into an amber midtone (#D63400) down to a deeply muted, dark charcoal-brown.
          background:
            'radial-gradient(circle, #FF5A1F 0%, #FF3F00 22%, #9E1F00 48%, #3A0B00 70%, #120400 88%, transparent 100%)',
        }}
      />
    </div>
  );
}

export default GradientLight;