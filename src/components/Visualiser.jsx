import React, { useRef, useEffect, useState } from 'react';
import AudioMotionAnalyzer from 'https://cdn.skypack.dev/audiomotion-analyzer?min';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Button from '@mui/material/Button';
import YouTubeToHtml5 from '@thelevicole/youtube-to-html5-loader';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid';
import '../App.css';

import { IoPersonCircleSharp } from "react-icons/io5";
import { SiYoutubemusic } from "react-icons/si";
import { FaCirclePlay } from "react-icons/fa6";
import { FaPauseCircle } from "react-icons/fa";
import { IoPlaySkipBackCircle } from "react-icons/io5";
import { IoPlaySkipForwardCircle } from "react-icons/io5";

const AudioAnalyzer = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [audioMotion, setAudioMotion] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('https://youtu.be/Bu5D58xdVCQ?si=Oa9Ltt6DA2DV9Pp-');
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [videoTitle, setVideoTitle] = useState('');
  const [videoAuthor, setVideoAuthor] = useState('');
  const handleInputChange = (event) => {

    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    setYoutubeUrl(inputValue);
  };

  const getData = async () => {
    try {
      const response = await axios.get(`https://noembed.com/embed?dataType=json&url=${youtubeUrl}`);
      // console.log(response.data);
      setVideoTitle(response.data.title);
      setVideoAuthor(response.data.author_name);
    } catch (err) {
      alert(err);
    }
  }

  const loadVideo = async () => {
    const controller = new YouTubeToHtml5({
      withAudio: true,
    });

    await controller.load(youtubeUrl);

    const videoElement = document.querySelector('video[data-yt2html5]');
    if (videoElement) {
      videoRef.current = videoElement;

      if (audioMotion) {
        audioMotion.disconnectInput();
        audioMotion.connectInput(videoElement);
      }

      // Update duration and current time
      videoElement.onloadedmetadata = () => {
        setDuration(videoElement.duration);
      };

      videoElement.ontimeupdate = () => {
        setCurrentTime(videoElement.currentTime);
      };
    }
  };

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const seekVideo = (event) => {

    videoRef.current.currentTime = event.target.value;
    if (videoRef.current) {
    }
  };

  const calculateVisualiserSize = () => {
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  
    const canvasHeight = viewportHeight * 0.45;
    const canvasWidth = viewportWidth * 0.75;
  
    return { canvasWidth, canvasHeight };
  };

  useEffect(() => {
    loadVideo();
    getData();

    
    if (containerRef.current) {
      videoRef.current.src = youtubeUrl;
      
      const analyzer = new AudioMotionAnalyzer(containerRef.current, {
        source: videoRef.current,
        height: 150,
        mode: 4,
        barSpace: 0.6,
        ledBars: true,
        gradient: 'rainbow',
        overlay: true,
        bgAlpha: 0.1,
        showScaleX: false,
        // radial: true
      });
      
      setAudioMotion(analyzer);

      const { canvasWidth, canvasHeight } = calculateVisualiserSize();
      analyzer.setCanvasSize(canvasWidth, canvasHeight);
      
      // Clean up on component unmount
      return () => analyzer.destroy();
    }

  }, [youtubeUrl]);

  return (
    <>
      <Box className="overlay"></Box>

      <Box>
        <video ref={videoRef} className="video-background" data-yt2html5={youtubeUrl} />
      </Box>

      <Box className="content">

        <Grid container
          marginTop={"2.5%"}
          display={'flex'}
          flexDirection={'column'}
          spacing={2}
        >       
          <Grid item>
            <Typography variant="h2" style={{ fontWeight: 600 }}>Now Playing</Typography>
          </Grid>

          <Grid item display="flex" alignItems="center" justifyContent="center">
            <SiYoutubemusic size={25} style={{ marginRight: '5px' }} />
            <Typography variant="h5">{videoTitle}</Typography>
          </Grid>  

          <Grid item style={{ marginTop: '0%' }} display="flex" alignItems="center" justifyContent="center">
            <IoPersonCircleSharp size={25} style={{ marginRight: '5px' }} />
            <Typography variant="h5">{videoAuthor}</Typography>
          </Grid>

        </Grid>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          ref={containerRef}
          marginX={'12%'}
          marginY={'2.5%'}
          minHeight={'45vh'}
          maxHeight={'45vh'}
        />

        <Box>
          <TextField
            placeholder="YouTube URL"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            style={{ backgroundColor: 'white', borderRadius: '5px',width: '45%' }}
            InputLabelProps={{shrink: false}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box mt={'1.5%'} mx={'30%'}>
          <Box>
            <Typography>
              {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} {' / '} 
              {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
            </Typography>
          </Box>

          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={seekVideo}
            style={{ width: '100%' }}
          />
        </Box>

        <Box mt={'-8px'}>
          <IconButton>
            <IoPlaySkipBackCircle size={40} style={{ color: 'white' }} />
          </IconButton>
          
          <IconButton onClick={isPlaying ? pauseVideo : playVideo}>
            {isPlaying ? <FaPauseCircle style={{ color: 'white' }} size={40} /> : <FaCirclePlay style={{ color: 'white' }} size={40} />}
          </IconButton>

          <IconButton>
            <IoPlaySkipForwardCircle size={40} style={{ color: 'white' }} />
          </IconButton>
        </Box>

      </Box>
    </>
  );
};

export default AudioAnalyzer;
