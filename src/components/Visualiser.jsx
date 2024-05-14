import React, { useRef, useEffect, useState } from 'react';
import AudioMotionAnalyzer from 'https://cdn.skypack.dev/audiomotion-analyzer?min';
import ReactPlayer from 'react-player'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const AudioAnalyzer = () => {
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  const videoRef = useRef(null);

  const [audioMotion, setAudioMotion] = useState(null);

  const [inputValue, setInputValue] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    setYoutubeUrl(inputValue);
  };


  // ERROR:
  // - React-player is not an instance of the HTML media element
  // - How can I convert spotify/youtube videos to HTML media elements?

  useEffect(() => {

    // const videoElement = audioRef.current.getInternalPlayer();
    // console.log("this is the current video element", videoElement);
    // Initialize the AudioMotionAnalyzer once the component mounts
    if (containerRef.current && audioRef.current) {
      // const analyzer = new AudioMotionAnalyzer(containerRef.current, {
      //   source: audioRef.current,
      //   height: 150,
      //   mode: 3,
      //   barSpace: 0.6,
      //   ledBars: true,
      // });
      const analyzer = new AudioMotionAnalyzer(containerRef.current, {
        source: audioRef.current,
        height: 150,
        mode: 3,
        barSpace: 0.6,
        ledBars: true,
      });
      setAudioMotion(analyzer);
      // Clean up on component unmount
      return () => analyzer.destroy();
    }
  }, []);

  // AudioRef is a HTML media element, which has the play() method
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play

  const playLiveStream = () => {
    if (audioRef.current) {
      audioRef.current.src = 'https://icecast2.ufpel.edu.br/live';
      audioRef.current.play();
    }
  };

  const handleFileUpload = (event) => {
    const fileBlob = event.target.files[0];
    if (fileBlob && audioRef.current) {
      audioRef.current.src = URL.createObjectURL(fileBlob);
      audioRef.current.play();
    }
  };


  const handleVideo = () => {
    if (videoRef.current) {
      videoRef.current.src = youtubeUrl;
      const analyzer = new AudioMotionAnalyzer(containerRef.current, {
        source: videoRef.current,
        height: 150,
        mode: 3,
        barSpace: 0.6,
        ledBars: true,
      });
      setAudioMotion(analyzer);
      // videoRef.current.play();
    }
  }


  return (
    <>
      <div>
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}></div>

        <audio ref={audioRef} controls style={{ display: 'none' }}></audio>

        <button onClick={playLiveStream}>Play Live Stream</button>

        <button onClick={handleVideo}>Sync Video</button>

        <input type="file" onChange={handleFileUpload} />
        <div id="version">v{audioMotion && AudioMotionAnalyzer.version}</div>
      </div>

      <Box>
        <TextField
          id="outlined-basic"
          label="YouTube URL"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>

        <ReactPlayer
          ref={videoRef}
          playing='true'
          controls='true'
          url={youtubeUrl}
        />

      </Box>
    </>  
  );
};

export default AudioAnalyzer;
