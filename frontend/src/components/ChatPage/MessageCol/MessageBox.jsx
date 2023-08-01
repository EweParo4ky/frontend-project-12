import React from 'react';

const MessageBox = ({ selectedChannelMessages }) => (
  <div id="messages-box" className="chat-messages overflow-auto px-5 ">
    {selectedChannelMessages.map(({ id, body, username }) => (
      <div className="text-break mb-2" key={id}>
        <b>{username}</b>
        {`: ${body}`}
      </div>
    ))}
  </div>
);

export default MessageBox;
