import { AlertProps } from '../../../types';
import { RootState } from '../index';

const selectNotification = (state: RootState): AlertProps =>
  state.notification.alert;

// eslint-disable-next-line import/prefer-default-export
export { selectNotification };
