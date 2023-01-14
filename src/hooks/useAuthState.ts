import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from 'reactfire';
import { setUser, unSetUser } from '../store/user/slice';

const useAuthState = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.email && user?.displayName && user?.uid) {
        const { email: userEmail, displayName, uid } = user;
        dispatch(setUser({ email: userEmail, username: displayName, id: uid }));
      } else {
        dispatch(unSetUser());
      }
    });
    return unsubscribe;
  }, [auth, dispatch]);
};

export default useAuthState;
