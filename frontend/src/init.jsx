import React from 'react';
import { Provider } from 'react-redux';

import store from './slices/index.js';
import App from './components/App.jsx';

const init = async () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default init;
