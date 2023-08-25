import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import i18next from 'i18next';
import filter from 'leo-profanity';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as ProviderRollbar, ErrorBoundary } from '@rollbar/react';
import resources from './locales';
import { SocketProvider } from './contexts/socketContext.jsx';
import { actions as messagesActions } from './slices/messagesSlice';
import { actions as channelsActions } from './slices/channelsSlice.js';
import store from './slices/index.js';
import App from './components/App.jsx';

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      debug: false,
    });

  const socket = io();

  socket
    .on('newMessage', (message) => {
      store.dispatch(messagesActions.addMessage(message));
    })
    .on('newChannel', (channelWithId) => {
      store.dispatch(channelsActions.addChannel(channelWithId));
    })
    .on('removeChannel', (selectedChannel) => {
      store.dispatch(channelsActions.deleteChannel(selectedChannel.id));
    })
    .on('renameChannel', (renamedChannel) => {
      store.dispatch(channelsActions.renameChannel({
        id: renamedChannel.id,
        changes: {
          name: renamedChannel.name,
        },
      }));
    });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'production',
  };

  const ruDictionary = filter.getDictionary('ru');
  filter.add(ruDictionary);

  return (
    <Provider store={store}>
      <ProviderRollbar config={rollbarConfig}>
        <ErrorBoundary>
          <SocketProvider socket={socket}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </SocketProvider>
        </ErrorBoundary>
      </ProviderRollbar>
    </Provider>
  );
};

export default init;
