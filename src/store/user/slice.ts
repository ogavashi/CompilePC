import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types/index';
import { LoadingState } from '../../common/constants';

export interface UserDataState {
  user: User | null;
  loadingState: LoadingState;
}

const initialState: UserDataState = {
  user: null,
  loadingState: LoadingState.LOADING,
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
    setLoadingState: (state, action: PayloadAction<LoadingState>) => {
      state.loadingState = action.payload;
    },
  },
});

export const { setUser, unSetUser, setLoadingState } = userDataSlice.actions;

export default userDataSlice.reducer;
