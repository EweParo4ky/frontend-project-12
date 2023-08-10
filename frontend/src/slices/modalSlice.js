/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.modalType = payload.modalType;
    },
    closeModal: (state) => {
      state.modalType = null;
    },
  },
});

export default modalSlice.reducer;
export const { actions } = modalSlice;
