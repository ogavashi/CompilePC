import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types/index';

export interface UserDataState {
  user: User | null;
}

const initialState: UserDataState = {
  user: null,
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    unSetUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, unSetUser } = userDataSlice.actions;

export default userDataSlice.reducer;
