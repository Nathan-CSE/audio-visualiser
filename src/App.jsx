import logo from './logo.svg';
import './App.css';
import Visualiser from './components/Visualiser';
import VisualiserOptions from './components/VisualiserOptions';
function App() {

  return (
    <div className="App">
      <VisualiserOptions />
      <Visualiser />
    </div>
  );
}

export default App;
