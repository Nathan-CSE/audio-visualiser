import React, { useContext, useEffect, useState } from 'react';
import VisualiserContext from './VisualiserContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Button from '@mui/material/Button';
import YouTubeToHtml5 from '@thelevicole/youtube-to-html5-loader';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import { InputAdornment } from '@mui/material';
import '../App.css';

import { HiSpeakerWave } from "react-icons/hi2";
import { IoPersonCircleSharp } from "react-icons/io5";
import { SiYoutubemusic } from "react-icons/si";
import { FaCirclePlay } from "react-icons/fa6";
import { FaPauseCircle } from "react-icons/fa";
import { IoPlaySkipBackCircle } from "react-icons/io5";
import { IoPlaySkipForwardCircle } from "react-icons/io5";

const NowPlaying = () => {
  const { containerRef, videoRef, audioMotion } = useContext(VisualiserContext);
  const [inputValue, setInputValue] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('https://youtu.be/Bu5D58xdVCQ?si=Oa9Ltt6DA2DV9Pp-');
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
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
      setVideoTitle(response.data.title);
      setVideoAuthor(response.data.author_name);
    } catch (err) {
      alert(err);
    }
  };

  const loadVideo = async () => {
    const controller = new YouTubeToHtml5({
      withAudio: true,
    });

    controller.load(youtubeUrl);

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

  const seekVideo = (newValue) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const changeVolume = (newValue) => {
    if (videoRef.current) {
      videoRef.current.volume = newValue / 100;
      setVolume(newValue);
    }
  };

  useEffect(() => {
    loadVideo();
    getData();
  }, [youtubeUrl]);

  return (
    <>
      <Box className="overlay"></Box>

      <Box>
        <video ref={videoRef} className="video-background" data-yt2html5={youtubeUrl} />
      </Box>

      <Box className="content">
        <Grid container marginTop={"2.5%"} display={'flex'} flexDirection={'column'} spacing={2}>
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

        {/* This Box is where the audio visualiser is rendered */}
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
            style={{ backgroundColor: 'white', borderRadius: '5px', width: '45%' }}
            InputLabelProps={{ shrink: false }}
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
          <Slider
            min={0}
            max={duration}
            value={currentTime}
            onChange={seekVideo}
            style={{ width: '100%' }}
          />
        </Box>

        <Box display={'flex'} alignItems={'center'} mx={'29%'}>
          <Box display={'flex'} mr='1%'>
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

            <Box display="flex" alignItems="center" mr="25%">
              <Typography>
                {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} {' / '} 
                {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
              </Typography>
            </Box>
            
            <Box display="flex" alignItems="center" ml={'12%'} mr='4%' width={'20%'}>
              <HiSpeakerWave style={{ marginRight: '10px' }} size={40} />
              <Slider
                value={volume}
                onChange={changeVolume}
                style={{ width: '100%' }}
              />
            </Box>
          </Box>

        </Box>
    </>
  );
};

export default NowPlaying;
