import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import firebaseApp from '../../../common/firebaseApp';
import theme from '../../../common/theme';
import Root from '../Root';
import { UIContextProvider } from '../UIContext';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <FirebaseAppProvider firebaseApp={firebaseApp}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
            <CssBaseline />
            <UIContextProvider>
              <Root />
            </UIContextProvider>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </FirebaseAppProvider>
  );
};

export default App;
