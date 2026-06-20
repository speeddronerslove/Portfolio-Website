import { SceneContextProvider } from '../context/SceneContext.jsx';
import { GradientLight } from './GradientLight.jsx';

// Composition root for the whole scrolling experience. Wraps the scene
// sequence in shared context (active scene, scroll progress, reduced
// motion) and renders the single persistent atmosphere layer behind it.
//
// This component never imports a scene directly — scenes are passed in as
// children from App.jsx, keeping the dependency direction one-way:
// scenes register outward → orchestrator computes state → atmosphere
// reacts. See Architecture §1 and §8.
export function ScrollOrchestrator({ children }) {
  return (
    <SceneContextProvider>
      <GradientLight />
      <main className="relative z-10">{children}</main>
    </SceneContextProvider>
  );
}

export default ScrollOrchestrator;
