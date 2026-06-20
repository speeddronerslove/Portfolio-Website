import { useEffect, useRef } from 'react';
import { useSceneContext } from '../context/SceneContext.jsx';

// Registers a scene with the shared IntersectionObserver owned by
// SceneContextProvider, and reports whether this scene is currently
// "active." This exists so SceneWrapper — and only SceneWrapper — needs to
// touch IntersectionObserver/context wiring; individual scene content never
// does.
export function useSceneInView(sceneId) {
  const ref = useRef(null);
  const { activeSceneId, registerScene, unregisterScene } = useSceneContext();

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    registerScene(sceneId, node);
    return () => unregisterScene(sceneId);
  }, [sceneId, registerScene, unregisterScene]);

  return { ref, isActive: activeSceneId === sceneId };
}

export default useSceneInView;
