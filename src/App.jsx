import logo from './logo.svg';
import './App.css';
import AudioMotionAnalyzer from 'audiomotion-analyzer';
import DesktopAudioCapture from './components/Visualiser';
import AddYoutube from './components/AddYoutube';

function App() {

  return (
    <div className="App">
      <DesktopAudioCapture />
      {/* <AddYoutube /> */}
    </div>
  );
}

export default App;
