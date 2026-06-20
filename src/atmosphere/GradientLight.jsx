import { useEffect } from 'react';
import { motion, useTransform, useMotionValue, animate } from 'framer-motion';
import { useSceneContext } from '../context/SceneContext.jsx';

// The single persistent "light source" described in the Design Bible:
// "orange is not a theme color, orange behaves like a light source." This
// is the only place in the entire app that paints the accent gradient —
// scenes never set their own background color or introduce a second
// gradient. See Architecture §3 and §4.
//
// It's a fixed, full-viewport layer sitting behind every scene (z-0).
//
// Position drifts continuously off total scroll progress (0–1), which is
// safe to do as a raw percentage — it's just ambient motion, and "wrong"
// drift speed isn't something a visitor would ever notice.
//
// Intensity (opacity) is different: the Scene Map calls for specific,
// deliberate jumps in strength scene to scene (e.g. "orange light grows
// slightly stronger than Scene 2" for Journey). Driving that off a raw
// scroll-percentage breakpoint would silently drift wrong every time a
// scene is added or resized, since percentages are relative to total page
// height. Instead each scene claims one intensity value in the map below,
// keyed by its SceneWrapper id, and GradientLight animates toward it
// whenever SceneContext's activeSceneId changes. Adding scene 4 onward is
// a one-line addition here, not a re-tuning of breakpoints.
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

  const driftTop = useTransform(scrollProgress, [0, 1], ['10%', '90%']);

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
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden bg-bg">
      <motion.div
        className="absolute left-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          top: reducedMotion ? '50%' : driftTop,
          opacity: intensity,
          background:
            'radial-gradient(circle, var(--color-accent-1) 0%, var(--color-accent-2) 30%, var(--color-accent-3) 55%, var(--color-accent-4) 75%, transparent 100%)',
        }}
      />
    </div>
  );
}

export default GradientLight;