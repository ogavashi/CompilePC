import { RootState } from '../index';
import { User } from '../../../types';

const selectUser = (state: RootState): User | null => state.userData.user;

export default selectUser;
