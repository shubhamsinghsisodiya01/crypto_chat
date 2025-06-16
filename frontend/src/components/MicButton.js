import React from 'react';

const MicButton = () => {
  const handleMicClick = () => {
    // Implement voice input using Web Speech API or other libraries
    console.log('Mic button clicked');
  };

  return <button onClick={handleMicClick} className="mic-button">🎤</button>;
};

export default MicButton;