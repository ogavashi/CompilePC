import { RootState } from '../index';
import { User } from '../../../types';
import { LoadingState } from '../../common/constants';

const selectUser = (state: RootState): User | null => state.userData.user;

const selectLoadingState = (state: RootState): LoadingState =>
  state.userData.loadingState;

export { selectUser, selectLoadingState };
