import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import builderReducer from './builder/slice';
import userDataReducer from './user/slice';
import notificationReducer from './notification/slice';

import handleError from './middleware/handleError';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: ['userData', 'notification'],
};

const builderPersistConfig = {
  key: 'builder',
  storage: storageSession,
};

const rootReducer = combineReducers({
  builder: persistReducer(builderPersistConfig, builderReducer),
  userData: userDataReducer,
  notification: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([handleError]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
