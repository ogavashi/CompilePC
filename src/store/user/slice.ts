import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';
import { User } from '../../../types/index';
import { LoadingState } from '../../common/constants';
import auth from '../../common/fireBaseAuth';

export interface UserDataState {
  user: User | null;
  loadingState: LoadingState;
}

export type UserLoginRequestDto = {
  email: string;
  password: string;
};

type UserRegisterRequestDto = {
  email: string;
  username: string;
  password: string;
};

export const login = createAsyncThunk<User | null, UserLoginRequestDto>(
  'user/login',

  async (payload) => {
    try {
      const { email, password } = payload;
      const userCredentials = await auth.signInWithEmailAndPassword(
        email,
        password,
      );

      const receivedUser = userCredentials?.user;

      if (
        receivedUser?.email &&
        receivedUser?.displayName &&
        receivedUser?.uid
      ) {
        const { email: userEmail, displayName, uid } = receivedUser;

        const user: User = {
          email: userEmail,
          username: displayName,
          id: uid,
        };

        return user;
      }
      return null;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      return null;
    }
  },
);

export const register = createAsyncThunk<User | null, UserRegisterRequestDto>(
  'user/register',

  async (payload) => {
    try {
      const { email, password, username } = payload;

      const userCredentials = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );

      await userCredentials.user?.updateProfile({ displayName: username });

      const receivedUser = userCredentials?.user;

      if (
        receivedUser?.email &&
        receivedUser?.displayName &&
        receivedUser?.uid
      ) {
        const { email: userEmail, displayName, uid } = receivedUser;

        const user: User = {
          email: userEmail,
          username: displayName,
          id: uid,
        };

        return user;
      }
      return null;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      return null;
    }
  },
);

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
  extraReducers: (builder) =>
    builder
      .addMatcher(
        isAnyOf(login.fulfilled, register.fulfilled),
        (state, action: PayloadAction<User | null>) => {
          state.user = action.payload;
          state.loadingState = LoadingState.LOADED;
        },
      )
      .addMatcher(isAnyOf(login.pending, register.pending), (state) => {
        state.loadingState = LoadingState.LOADING;
      })
      .addMatcher(isAnyOf(login.rejected, register.rejected), (state) => {
        state.loadingState = LoadingState.ERROR;
      }),
});

export const { setUser, unSetUser, setLoadingState } = userDataSlice.actions;

export default userDataSlice.reducer;
