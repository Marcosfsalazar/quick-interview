import React from 'react';

const MessageTyping = () => {
  return (
    <div className="container message-bot-loading max-w-8/12 min-w-4 w-full py-0.5 px-2">
      <div className="flex items-center space-x-2">
        <div className="dot-pulse"></div>
      </div>
    </div>
  );
};

export default MessageTyping;
