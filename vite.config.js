import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Foundation-level config — deliberately plain. No path aliases or extra
// plugins are introduced here unless the architecture calls for them, so
// this file doesn't drift away from what's documented.
export default defineConfig({
  plugins: [react()],
});
