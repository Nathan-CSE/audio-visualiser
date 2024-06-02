import React, { useState } from 'react';
import { useQueue } from './QueueContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { InputAdornment } from '@mui/material';

const AddToQueue = () => {
  const { queue, addToQueue, removeFromQueue } = useQueue();
  const [youtubeUrl, setYoutubeUrl] = useState('https://youtu.be/8VpgVEoSSik?si=EJwCBbeJ4YOAn9pf');
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    setYoutubeUrl(inputValue);
    handleAdd();
  };

  const handleAdd = () => {
    if (inputValue.trim()) {
      addToQueue({ url: inputValue });
      console.log('video added!');
      setInputValue('');
    }

    console.log('this is the queue, ', queue);

  };

  const handleRemoveVideo = (id) => {
    removeFromQueue(id);
  };

  return (
    // <div>
    //   <TextField
    //     value={inputValue}
    //     onChange={(e) => setInputValue(e.target.value)}
    //     placeholder="Enter YouTube URL"
    //   />
    //   <Button onClick={handleAdd}>Add to Queue</Button>
    // </div>

    <>
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
        <ul>
          {queue.map(video => (
            <li key={video.id}>
              {video.youtubeUrl}
              <button onClick={() => handleRemoveVideo(video.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </Box>
    </>    
  );
};

export default AddToQueue;
