import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import firebaseApp from '../../../common/firebaseApp';
import theme from '../../../common/theme';
import Root from '../Root';
import { UIContextProvider } from '../UIContext';

const App: React.FC = () => {
  return (
    <FirebaseAppProvider firebaseApp={firebaseApp}>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
          <CssBaseline />
          <UIContextProvider>
            <Root />
          </UIContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </FirebaseAppProvider>
  );
};

export default App;
