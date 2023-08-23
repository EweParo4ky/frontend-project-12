import React, { createContext, useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const SocketContext = createContext();

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const sendNewMessage = (message) => {
    socket.emit('newMessage', message.payload);
  };

  const addNewChannel = (newChannel) => {
    socket.emit('newChannel', newChannel, (res) => {
      if (res.status === 'ok') {
        dispatch(channelsActions.addChannel);
        dispatch(channelsActions.setSelectedChannelId(res.data.id));
      }
    });
  };

  const deleteChannel = (selectedChannel) => {
    socket.emit('removeChannel', selectedChannel);
  };

  const renameChannel = (selectedChannel) => {
    socket.emit('renameChannel', selectedChannel);
  };

  const socketAPI = useMemo(() => ({
    sendNewMessage, addNewChannel, deleteChannel, renameChannel,
  }), []);

  return <SocketContext.Provider value={socketAPI}>{children}</SocketContext.Provider>;
};

const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket };
