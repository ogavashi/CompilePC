import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import firebaseApp from '../../common/firebaseApp';
import theme from '../../common/theme';
import Root from '../Root';
import { UIContextProvider } from '../UIContext';
import { AppContextProvider } from '../AppContext';
import { persistor, store } from '../../store';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <FirebaseAppProvider firebaseApp={firebaseApp}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
                <AppContextProvider>
                  <CssBaseline />
                  <UIContextProvider>
                    <Root />
                  </UIContextProvider>
                </AppContextProvider>
              </BrowserRouter>
            </ThemeProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </FirebaseAppProvider>
  );
};

export default App;
