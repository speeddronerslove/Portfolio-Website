import { ScrollOrchestrator } from './atmosphere/ScrollOrchestrator.jsx';
import { Arrival } from './scenes/01-Arrival/index.js';
import { Identity } from './scenes/02-Identity/index.js';
import { Journey } from './scenes/03-Journey/index.js';
import { Milestones } from './scenes/04-Milestones/index.js';
import { Work } from './scenes/05-Work/index.js';

// Scenes 6–8 remain ready for deployment hooks. Order represents layout serialization.
function App() {
  return (
    <ScrollOrchestrator>
      <Arrival />
      <Identity />
      <Journey />
      <Milestones />
      <Work />
      {/* <SceneWrapper id="creative-side"><CreativeSide /></SceneWrapper> */}
      {/* <SceneWrapper id="future"><Future /></SceneWrapper> */}
      {/* <SceneWrapper id="contact"><Contact /></SceneWrapper> */}
    </ScrollOrchestrator>  );
}

export default App;