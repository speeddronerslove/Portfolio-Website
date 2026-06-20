import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

const SceneContext = createContext(null);

// Consumed by anything that needs cross-scene state: GradientLight,
// NavMinimal, FadeBlend, and SceneWrapper (via useSceneInView). Scene
// content itself should rarely need this — see Architecture §8.
export function useSceneContext() {
  const ctx = useContext(SceneContext);
  if (!ctx) {
    throw new Error('useSceneContext must be used within a SceneContextProvider');
  }
  return ctx;
}

// Owns the only three pieces of cross-scene state in the app:
//   - activeSceneId  — which scene is currently most in view
//   - scrollProgress — smoothed 0–1 progress across the whole page
//   - reducedMotion  — the user's motion preference
//
// Scenes register themselves via registerScene/unregisterScene (called by
// useSceneInView inside SceneWrapper, never by scene authors directly).
// A single IntersectionObserver is shared across all registered scenes
// rather than one observer per scene.
//
// Ordering note: React commits child effects before parent effects. Child
// SceneWrapper components call registerScene() in their own mount effect,
// which runs before this provider's effect below — so by the time this
// effect creates the observer, every scene mounted on initial render has
// already added itself to nodesRef, and the forEach pass below catches them.
export function SceneContextProvider({ children }) {
  const [activeSceneId, setActiveSceneId] = useState(null);
  const nodesRef = useRef(new Map()); // sceneId -> DOM node
  const observerRef = useRef(null);
  const scrollProgress = useScrollProgress();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible) {
          setActiveSceneId(mostVisible.target.dataset.sceneId);
        }
      },
      { threshold: [0.25, 0.5, 0.75] }
    );

    nodesRef.current.forEach((node) => observerRef.current.observe(node));

    return () => observerRef.current?.disconnect();
  }, []);

  const registerScene = useCallback((sceneId, node) => {
    if (!node) return;
    node.dataset.sceneId = sceneId;
    nodesRef.current.set(sceneId, node);
    observerRef.current?.observe(node);
  }, []);

  const unregisterScene = useCallback((sceneId) => {
    const node = nodesRef.current.get(sceneId);
    if (node) observerRef.current?.unobserve(node);
    nodesRef.current.delete(sceneId);
  }, []);

  const value = useMemo(
    () => ({
      activeSceneId,
      scrollProgress,
      reducedMotion,
      registerScene,
      unregisterScene,
    }),
    [activeSceneId, scrollProgress, reducedMotion, registerScene, unregisterScene]
  );

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>;
}

export default SceneContext;
