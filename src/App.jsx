import './App.css';
import Box from '@mui/material/Box';
import VisualiserOptions from './components/VisualiserOptions';
import { VisualiserProvider } from './components/VisualiserContext';
import { QueueProvider } from './components/QueueContext';
import NowPlaying from './components/NowPlaying';

function App() {
  return (
    <>
      <Box className="App">
        <VisualiserProvider>
          <QueueProvider>
            <VisualiserOptions />
            <NowPlaying />
          </QueueProvider>
        </VisualiserProvider>
      </Box>
    </>
  );
}

export default App;
