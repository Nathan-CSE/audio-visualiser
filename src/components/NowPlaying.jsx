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

import AddToQueue from './AddToQueue';
import { useQueue } from './QueueContext';

const NowPlaying = () => {
  const { containerRef, videoRef, audioMotion } = useContext(VisualiserContext);

  const { queue, addToQueue, removeFromQueue } = useQueue();
  const [currentVideo, setCurrentVideo] = useState(null);

  const [inputValue, setInputValue] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('https://youtu.be/8VpgVEoSSik?si=EJwCBbeJ4YOAn9pf');
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
      autoload: false,
    });

    // Add loading class to video element
    controller.addAction('api.before', function(element) {   
      element.classList.add('is-loading');
    });

    // Remove loading class after API HTTP request completes.
    // Play video after API request finishes
    controller.addAction('api.after', function(element) {
      element.classList.remove('is-loading');
      try {

        playVideo();
      } catch (error) {
        console.error('Error playing video:', error);
      }
    });

    controller.load();

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
      try {

        videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing video:', error);
      }
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seekVideo = (event, newValue) => {
    if (!isNaN(newValue) && isFinite(newValue) && videoRef.current) {
      videoRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    } else {
      console.error('Invalid time value:', newValue);
    }
  };
  
  const changeVolume = (event, newValue) => {
    if (!isNaN(newValue) && isFinite(newValue) && videoRef.current) {
      videoRef.current.volume = newValue / 100;
      setVolume(newValue);
    } else {
      console.error('Invalid volume value:', newValue);
    }
  };

  useEffect(() => {
    loadVideo();
    getData();

  }, [youtubeUrl]);

  useEffect(() => {
    if (currentVideo) {
      loadVideo(currentVideo.url);
    }
  }, [currentVideo]);

  // This checks to see if the current video has finished playing
  useEffect(() => {
    if (currentTime >= duration) {
      if (queue.length > 0) {
               
        const newVideo = queue[0];
        setYoutubeUrl(newVideo.youtubeUrl);
        removeFromQueue(newVideo.id);

      } else {
        console.log("No more videos in the queue");
        // Handle the end of the queue scenario, e.g., set a default video, show a message, etc.
      }
    }
  }, [currentTime])
    
  return (
    <>
      <Box className="overlay"></Box>

      <Box>
        <video autoplay ref={videoRef} className="video-background" data-yt2html5={youtubeUrl} />
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

        <AddToQueue />

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
