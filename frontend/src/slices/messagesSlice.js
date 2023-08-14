import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: messagesAdapter.setAll,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.deleteChannel, (state, action) => {
      const deletedChannelId = action.payload;
      const allEntities = Object.values(state.entities);
      const deletedChannelMessagesIds = allEntities
        .filter((e) => e.channelId === deletedChannelId)
        .map(({ id }) => id);
      messagesAdapter.removeMany(state, deletedChannelMessagesIds);
    });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
