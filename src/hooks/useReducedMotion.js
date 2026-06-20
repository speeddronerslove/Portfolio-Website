import { useEffect, useState } from 'react';

// Wraps the OS-level prefers-reduced-motion query into a single hook.
// Consumed once by SceneContext and exposed app-wide from there — nothing
// else should query matchMedia directly. See Architecture §3.
export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event) => setReducedMotion(event.matches);

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}

export default useReducedMotion;
