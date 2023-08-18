import { React, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

const MessagesBox = ({ selectedChannelMessages }) => {
  useEffect(() => {
    scroll.scrollToBottom({ containerId: 'messages-box', delay: 0, duration: 0 });
  }, [selectedChannelMessages.length]);

  return (
    selectedChannelMessages.map(({ id, body, username }) => (
      <div className="text-break mb-2" key={id}>
        <b>{username}</b>
        {`: ${body}`}
      </div>
    ))
  );
};

export default MessagesBox;
