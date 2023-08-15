import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resources from './locales';
import { SocketProvider } from './contexts/socketContext.jsx';

import store from './slices/index.js';
import App from './components/App.jsx';

const socket = io();

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      debug: false,
    });

  return (
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </SocketProvider>
    </Provider>
  );
};

export default init;
