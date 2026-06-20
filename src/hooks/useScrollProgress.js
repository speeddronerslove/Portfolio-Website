import { useScroll, useSpring } from 'framer-motion';

// Global 0–1 scroll progress for the entire page, lightly smoothed so
// scroll-linked atmosphere effects (GradientLight's drift) don't feel
// jittery on fast or trackpad-heavy scrolling. Consumed once by
// SceneContext and shared from there — scenes don't call useScroll
// individually.
export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  return useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.3,
  });
}

export default useScrollProgress;
