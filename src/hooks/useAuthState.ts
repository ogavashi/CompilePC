import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from 'reactfire';
import { LoadingState } from '../common/constants';
import { setLoadingState, setUser, unSetUser } from '../store/user/slice';

const useAuthState = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(setLoadingState(LoadingState.LOADING));
      if (user?.email && user?.displayName && user?.uid) {
        const { email: userEmail, displayName, uid } = user;
        dispatch(setUser({ email: userEmail, username: displayName, id: uid }));
        dispatch(setLoadingState(LoadingState.LOADED));
      } else {
        dispatch(unSetUser());
        dispatch(setLoadingState(LoadingState.IDLE));
      }
    });
    return unsubscribe;
  }, [auth, dispatch]);
};

export default useAuthState;
