import './App.css';
import Box from '@mui/material/Box';
import VisualiserOptions from './components/VisualiserOptions';
import { VisualiserProvider } from './components/VisualiserContext';
import NowPlaying from './components/NowPlaying';

function App() {
  return (
    <>
      <Box className="App">
        <VisualiserProvider>
          <VisualiserOptions />
          <NowPlaying />
        </VisualiserProvider>
      </Box>
    </>
  );
}

export default App;
