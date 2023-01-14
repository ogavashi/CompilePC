import React, { createContext, useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { selectNotification } from '../../store/notification/selectors';
import { AlertProps } from '../../../types';

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

interface UIContextProps {
  setAlert: React.Dispatch<React.SetStateAction<AlertProps>>;
}

type UIContextProviderProps = {
  children: React.ReactNode;
};

export const UIContextProvider: React.FC<UIContextProviderProps> = ({
  children,
}) => {
  const [alert, setAlert] = useState<AlertProps>({
    show: false,
    severity: 'info',
    message: '',
  });

  const notification = useSelector(selectNotification);

  useEffect(() => {
    setAlert(notification);
  }, [notification]);

  const handleClose = () => setAlert((prev) => ({ ...prev, show: false }));

  return (
    <UIContext.Provider value={{ setAlert }}>
      {children}
      <Snackbar open={alert.show} autoHideDuration={4000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" severity={alert.severity}>
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </UIContext.Provider>
  );
};
