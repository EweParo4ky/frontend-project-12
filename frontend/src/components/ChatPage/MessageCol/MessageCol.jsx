import React from 'react';
import MessageForm from './MessageForm';
import MessageBox from './MessageBox';

const MessageCol = ({ auth, currentChannel, selectedChannelMessages }) => (
  <div className="d-flex flex-column h-100">
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{currentChannel && `# ${currentChannel.name}`}</b>
      </p>
      <span className="text-muted">0 сообщений</span>
    </div>
    <div id="messages-box" className="chat-messages overflow-auto px-5 " />
    <MessageBox selectedChannelMessages={selectedChannelMessages} />
    <div className="mt-auto px-5 py-3">
      <MessageForm />
      <button
        type="button"
        className="mt-3 btn btn-outline-info"
        onClick={() => auth.logOut()}
      >
        Выйти
      </button>
    </div>
  </div>
);

export default MessageCol;
