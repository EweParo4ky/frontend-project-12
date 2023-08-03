import React, { createContext, useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const SocketContext = createContext();

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  socket
    .on('connect', () => {
      console.log({ '/////USER CONNECTED!!!!///////// socket.id': socket.id });
    })
    .on('newMessage', (message) => {
      console.log('payload newMessage', message);
      dispatch(messagesActions.addMessage(message));
    });

  const sendNewMessage = (message) => {
    console.log('sendnewMessage', message);
    socket.emit('newMessage', message.payload);
  };

  const socketAPI = useMemo(() => ({
    sendNewMessage,
  }), []);

  return <SocketContext.Provider value={socketAPI}>{children}</SocketContext.Provider>;
};

const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket };
