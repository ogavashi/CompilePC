import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertProps } from '../../../types';

export interface NotificationState {
  alert: AlertProps;
}

const initialState: NotificationState = {
  alert: { show: false, severity: 'info', message: '' },
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<AlertProps>) => {
      state.alert = action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
