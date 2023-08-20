import React, { useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  actions as channelsActions,
  selectors as channelsSelectors,
} from '../../slices/channelsSlice.js';
// import { setSelectedChannelId } from '../../slices/selectedChannelSlice.js';
import {
  actions as messagesActions,
  selectors as messageSelectors,
} from '../../slices/messagesSlice.js';
import { useAuth } from '../../contexts/authContext.jsx';
import routes from '../../routes.js';

import ChannelsCol from './ChannelsCol/ChannelsCol.jsx';
import MessagesCol from './MessagesCol/MessagesCol.jsx';
import Nav from '../NavBar/Nav.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const { t } = useTranslation();
  const { token } = auth.userData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(routes.dataApiPath(), {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(channelsActions.setChannels(res.data.channels));
        dispatch(channelsActions.setSelectedChannelId(res.data.currentChannelId));
        dispatch(messagesActions.setMessages(res.data.messages));
      } catch (error) {
        if (!error.isAxiosError) throw error;
        console.error(error);
        if (error.code === 'ERR_BAD_REQUEST') auth.logOut();
        else toast.error(t('errors.networkError'));
      }
    };
    fetchData();
  }, [dispatch, token, auth, t]);

  const channels = useSelector(channelsSelectors.selectAll);
  const selectedChannelId = useSelector((state) => state.channels.selectedChannelId);
  const currentChannel = useSelector(
    (state) => channelsSelectors.selectById(state, selectedChannelId),
  );
  const selectedChannelMessages = useSelector(messageSelectors.selectAll)
    .filter(({ channelId }) => channelId === selectedChannelId);

  return (
    <div className="d-flex flex-column h-100">
      <Nav />
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <ChannelsCol
            channels={channels}
            selectedChannelId={selectedChannelId}
          />
          <div className="col p-0 h-100">
            <MessagesCol
              currentChannel={currentChannel}
              selectedChannelMessages={selectedChannelMessages}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default ChatPage;
