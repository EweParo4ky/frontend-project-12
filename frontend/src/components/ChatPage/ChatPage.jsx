import React, { useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  setChannels,
  selectors as channelsSelectors,
} from '../../slices/channelsSlice.js';
import { setSelectedChannelId } from '../../slices/selectedChannelSlice.js';
import {
  actions as messagesActions,
  selectors as messageSelectors,
} from '../../slices/messagesSlice.js';
import { useAuth } from '../../contexts/authContext.jsx';
import routes from '../../routes.js';

import ChannelsCol from './ChannelsCol/ChannelsCol.jsx';
import MessagesCol from './MessagesCol/MessagesCol.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const { token } = auth.userData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(routes.dataApiPath(), {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setChannels(res.data.channels));
        dispatch(setSelectedChannelId(res.data.currentChannelId));
        dispatch(messagesActions.setMessages(res.data.messages));
        console.log('responseFetchData!!!', res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const channels = useSelector(channelsSelectors.selectAll);
  console.log('channels!!!!', channels);
  const selectedChannelId = useSelector((state) => state.selectedChannel.value);
  console.log('selectedChannelId', selectedChannelId);
  const currentChannel = useSelector(
    (state) => channelsSelectors.selectById(state, selectedChannelId),
  );
  console.log('currentChannel', currentChannel);
  const messages = useSelector(messageSelectors.selectAll);
  console.log('MESSAGES', messages);
  const selectedChannelMessages = useSelector(messageSelectors.selectAll)
    .filter(({ id }) => id === selectedChannelId);
  console.log('selectedChannelMessages', selectedChannelMessages);

  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        {/* Nav */}
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelsCol
              channels={channels}
              selectedChannelId={selectedChannelId}
            />
            <div className="col p-0 h-100">
              <MessagesCol
                auth={auth}
                currentChannel={currentChannel}
                selectedChannelMessages={selectedChannelMessages}
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
export default ChatPage;
