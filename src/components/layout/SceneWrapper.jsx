import { useSceneInView } from '../../hooks/useSceneInView.js';

// Every scene is wrapped in this component. It owns:
//   - registration with the shared scroll observer (via useSceneInView)
//   - the data-scene-id attribute used by GradientLight/NavMinimal
//   - minimum-height behavior (min-h-dvh, not a fixed 100vh — see
//     Architecture §7, avoids the mobile address-bar resize jump)
//
// Scene content is passed in as children and never touches context,
// IntersectionObserver, or scroll state directly.
export function SceneWrapper({ id, className = '', children }) {
  const { ref, isActive } = useSceneInView(id);

  return (
    <section
      ref={ref}
      id={id}
      data-scene-id={id}
      data-active={isActive}
      className={`relative flex min-h-dvh w-full flex-col justify-center ${className}`}
    >
      {children}
    </section>
  );
}

export default SceneWrapper;
