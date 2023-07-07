import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import selectedChanneReducer from './selectedChannelSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    selectedChannel: selectedChanneReducer,
  },
});
