import logo from './logo.svg';
import './App.css';
import AudioMotionAnalyzer from 'audiomotion-analyzer';
import DesktopAudioCapture from './components/Visualiser';
import AddYoutube from './components/AddYoutube';
import Test from './components/Test';

function App() {

  return (
    <div className="App">
      <DesktopAudioCapture />
      {/* <AddYoutube /> */}
      {/* <Test /> */}
    </div>
  );
}

export default App;
