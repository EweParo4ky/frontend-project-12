import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { actions as messagesActions } from './slices/messagesSlice.js';

import store from './slices/index.js';
import App from './components/App.jsx';

const init = async () => {
  const socket = io();

  socket
    .on('connect', () => {
      console.log('/////USER CONNECTED!!!!/////');
      console.log({ '////socket.id////': socket.id });
    })
    .on('newMessage', (payload) => {
      console.log('payload newMessage', payload);
      store.dispatch(messagesActions.addMessage(payload));
    });

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default init;
