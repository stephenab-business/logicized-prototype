import './App.css';
import { CanvasEditorTest } from './CanvasEditor/CanvasEditorTest';

function App() {

  const type = 'float';

  return (
    <div className="App">
      <CanvasEditorTest type = {type} />
    </div>
  );
}

export default App;
