import './App.css';
import Box from '@mui/material/Box';
import VisualiserOptions from './components/VisualiserOptions';
import { VisualiserProvider } from './components/VisualiserContext';
import { QueueProvider } from './components/QueueContext';
import NowPlaying from './components/NowPlaying';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const userId = uuidv4();
  
  return (
    <>
      <Box className="App">
        <VisualiserProvider>
          <QueueProvider userId={userId}>
            <VisualiserOptions />
            <NowPlaying />
          </QueueProvider>
        </VisualiserProvider>
      </Box>
    </>
  );
}

export default App;
