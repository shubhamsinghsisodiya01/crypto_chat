import React from 'react';
import './ChatBubble.css'; // Add styles for bubble appearance

const ChatBubble = ({ text, sender }) => {
  return (
    <div className={`chat-bubble ${sender}`}>
      <p>{text}</p>
      <span className="timestamp">{new Date().toLocaleTimeString()}</span>
    </div>
  );
};

export default ChatBubble;
