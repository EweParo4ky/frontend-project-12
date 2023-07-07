/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  value: 'id текущего канала',
};

const selectedChannelSlice = createSlice({
  name: 'selectedChannel',
  initialState,
  reducers: {
    setSelectedChannelId: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default selectedChannelSlice.reducer;
export const { setSelectedChannelId } = selectedChannelSlice.actions;
