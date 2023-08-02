import React from 'react';
import MessagesForm from './MessagesForm';
import MessagesBox from './MessagesBox';

const MessageCol = ({ auth, currentChannel, selectedChannelMessages }) => (
  <div className="d-flex flex-column h-100">
    <div className="d-flex flex-row justify-content-between bg-light mb-4 p-3 shadow-sm small">
      <div>
        <p className="m-0">
          <b>{currentChannel && `# ${currentChannel.name}`}</b>
        </p>
        <span className="text-muted">{`${selectedChannelMessages.length} сообщений`}</span>
      </div>
      <div>
        <button
          type="button"
          className="mt-3 btn btn-outline-info"
          onClick={() => auth.logOut()}
        >
          Выйти
        </button>
      </div>
    </div>
    <div id="messages-box" className="chat-messages overflow-auto px-5 " />
    <MessagesBox selectedChannelMessages={selectedChannelMessages} />
    <div className="mt-auto px-5 py-3">
      <MessagesForm />
    </div>
  </div>
);

export default MessageCol;
