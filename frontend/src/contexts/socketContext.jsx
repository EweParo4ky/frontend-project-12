import React, { createContext, useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { setSelectedChannelId } from '../slices/selectedChannelSlice.js';

const SocketContext = createContext();

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  socket
    .on('connect', () => {
      console.log({ '/////USER CONNECTED!!!!///////// socket.id': socket.id });
    })
    .on('connect_error', () => {
      console.log('Socket "connect_error"');
    })
    .on('newMessage', (message) => {
      dispatch(messagesActions.addMessage(message));
    })
    .on('newChannel', (channelWithId) => {
      dispatch(channelsActions.addChannel(channelWithId));
    })
    .on('removeChannel', (selectedChannel) => {
      dispatch(channelsActions.deleteChannel(selectedChannel.id));
    })
    .on('renameChannel', (renamedChannel) => {
      dispatch(channelsActions.renameChannel({
        id: renamedChannel.id,
        changes: {
          name: renamedChannel.name,
        },
      }));
    });

  const sendNewMessage = (message) => {
    socket.emit('newMessage', message.payload);
  };

  const addNewChannel = (newChannel) => {
    socket.emit('newChannel', newChannel, (res) => {
      if (res.status === 'ok') {
        dispatch(channelsActions.addChannel);
        dispatch(setSelectedChannelId(res.data.id));
      }
    });
  };

  const deleteChannel = (selectedChannel) => {
    socket.emit('removeChannel', selectedChannel);
  };

  const renameChannel = (selectedChannel) => {
    console.log('inRENAMECHANNEL SelectedCHANNEL', selectedChannel);
    socket.emit('renameChannel', selectedChannel);
  };

  const socketAPI = useMemo(() => ({
    sendNewMessage, addNewChannel, deleteChannel, renameChannel,
  }), []);

  return <SocketContext.Provider value={socketAPI}>{children}</SocketContext.Provider>;
};

const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket };
