import { motion, useTransform } from 'framer-motion';
import { useSceneContext } from '../context/SceneContext.jsx';

// The single persistent "light source" described in the Design Bible:
// "orange is not a theme color, orange behaves like a light source." This
// is the only place in the entire app that paints the accent gradient —
// scenes never set their own background color or introduce a second
// gradient. See Architecture §3 and §4.
//
// It's a fixed, full-viewport layer sitting behind every scene (z-0), with
// position and intensity driven by the shared scroll progress from
// SceneContext rather than by each scene independently.
export function GradientLight() {
  const { scrollProgress, reducedMotion } = useSceneContext();

  // Drifts the light's vertical position slowly across the full scroll
  // range — a "light source switching on elsewhere in the room" between
  // scenes, per the Scene Map's transition language.
  const driftTop = useTransform(scrollProgress, [0, 1], ['10%', '90%']);
  const driftOpacity = useTransform(
    scrollProgress,
    [0, 0.05, 0.95, 1],
    [0.5, 0.85, 0.85, 0.5]
  );

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden bg-bg">
      <motion.div
        className="absolute left-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          top: reducedMotion ? '50%' : driftTop,
          opacity: reducedMotion ? 0.7 : driftOpacity,
          background:
            'radial-gradient(circle, var(--color-accent-1) 0%, var(--color-accent-2) 30%, var(--color-accent-3) 55%, var(--color-accent-4) 75%, transparent 100%)',
        }}
      />
    </div>
  );
}

export default GradientLight;
