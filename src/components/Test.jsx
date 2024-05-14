import React, { useState, useRef } from 'react';

const DesktopAudioCapture = () => {
  const [audioSrc, setAudioSrc] = useState(null);
  const audioElementRef = useRef(null);

  const startCapture = async () => {
    try {
      // Request access to desktop audio
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true, // Must request video to capture desktop
        audio: { echoCancellation: true }
      });

      // Extract the audio track from the stream
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length === 0) {
        alert('No audio track found in the captured media.');
        return;
      }

      // Create an AudioContext
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(new MediaStream(audioTracks));

      // Connect the source to the AudioContext destination (speakers)
      source.connect(audioContext.destination);

      // Set the audio source to the audio element
      setAudioSrc(new MediaStream(audioTracks));
      audioElementRef.current.play();
    } catch (error) {
      console.error('Error capturing desktop audio:', error);
    }
  };

  return (
    <div>
      <h1>Capture Desktop Audio Example</h1>
      <button onClick={startCapture}>Start Capture</button>
      {audioSrc && <audio ref={audioElementRef} controls srcObject={audioSrc}></audio>}
    </div>
  );
};

export default DesktopAudioCapture;
