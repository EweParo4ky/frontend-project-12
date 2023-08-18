import { React } from 'react';
import { useTranslation } from 'react-i18next';
import MessagesForm from './MessagesForm';
import MessagesBox from './MessagesBox';

const MessageCol = ({ currentChannel, selectedChannelMessages }) => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column h-100">
      <div className="d-flex flex-row justify-content-between bg-light mb-4 p-3 shadow-sm small">
        <div>
          <p className="m-0">
            <b>{currentChannel && `# ${currentChannel.name}`}</b>
          </p>
          <span className="text-muted">{selectedChannelMessages && `${t('chatPage.messageCol.counter.count', { count: selectedChannelMessages.length })}`}</span>
        </div>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        <MessagesBox selectedChannelMessages={selectedChannelMessages} />
      </div>
      <div className="mt-auto px-5 py-3">
        <MessagesForm />
      </div>
    </div>
  );
};

export default MessageCol;
