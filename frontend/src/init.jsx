import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { SocketProvider } from './contexts/socketContext.jsx';

import store from './slices/index.js';
import App from './components/App.jsx';

const socket = io();

const init = async () => (
  <Provider store={store}>
    <SocketProvider socket={socket}>
      <App />
    </SocketProvider>
  </Provider>
);

export default init;
