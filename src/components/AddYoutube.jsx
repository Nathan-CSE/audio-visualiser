import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddYoutube = () => {
  const [inputValue, setInputValue] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    setYoutubeUrl(inputValue);
  };

  return (
    <>
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
          playing='true'
          controls='true'
          url={youtubeUrl}
        />
        
      </Box>
    </>
  );
}

export default AddYoutube;
