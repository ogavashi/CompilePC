import { Middleware } from '@reduxjs/toolkit';
import { setNotification } from '../notification/slice';

const handleError: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action): void => {
    if (action.error) {
      const { message } = action.error;
      dispatch(setNotification({ show: true, severity: 'error', message }));
    }

    return next(action);
  };

export default handleError;
