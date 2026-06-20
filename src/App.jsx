import { ScrollOrchestrator } from './atmosphere/ScrollOrchestrator.jsx';
import { Arrival } from './scenes/01-Arrival/index.js';
import { Identity } from './scenes/02-Identity/index.js';

// Scenes 3–8 are not built yet. Each commented slot below corresponds 1:1
// to the approved Scene Map and will become an import of that scene's
// component from src/scenes/, the same way Arrival and Identity are wired
// below. Order here is the order they render in.
function App() {
  return (
    <ScrollOrchestrator>
      <Arrival />
      <Identity />
      {/* <SceneWrapper id="journey"><Journey /></SceneWrapper> */}
      {/* <SceneWrapper id="milestones"><Milestones /></SceneWrapper> */}
      {/* <SceneWrapper id="work"><Work /></SceneWrapper> */}
      {/* <SceneWrapper id="creative-side"><CreativeSide /></SceneWrapper> */}
      {/* <SceneWrapper id="future"><Future /></SceneWrapper> */}
      {/* <SceneWrapper id="contact"><Contact /></SceneWrapper> */}
    </ScrollOrchestrator>
  );
}

export default App;