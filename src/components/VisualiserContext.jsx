import React, { createContext, useRef, useEffect, useState } from 'react';
import AudioMotionAnalyzer from 'https://cdn.skypack.dev/audiomotion-analyzer?min';

const VisualiserContext = createContext();

export const VisualiserProvider = ({ children }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [audioMotion, setAudioMotion] = useState(null);

  const calculateVisualiserSize = () => {
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  
    const canvasHeight = viewportHeight * 0.45;
    const canvasWidth = viewportWidth * 0.75;
  
    return { canvasWidth, canvasHeight };
  };

  useEffect(() => {
    if (containerRef.current && videoRef.current) {
      const visualiser = new AudioMotionAnalyzer(containerRef.current, {
        source: videoRef.current,
        height: 150,
        mode: 4,
        barSpace: 0.6,
        ledBars: true,
        gradient: 'classic',
        overlay: true,
        bgAlpha: 0.5,
        showScaleX: false,
        showPeaks: false,
      });

      setAudioMotion(visualiser);
      const { canvasWidth, canvasHeight } = calculateVisualiserSize();
      visualiser.setCanvasSize(canvasWidth, canvasHeight);

      // Clean up on component unmount
      return () => visualiser.destroy();
    }
  }, [containerRef, videoRef]);

  return (
    <VisualiserContext.Provider value={{ containerRef, videoRef, audioMotion }}>
      {children}
    </VisualiserContext.Provider>
  );
};

export default VisualiserContext;
