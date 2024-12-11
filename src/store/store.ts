import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import narrativeReducer from './slices/narrativeSlice';
import historyReducer from './slices/historySlice';
import { RootState } from '../types/store';

export const store = configureStore({
  reducer: {
    narrative: narrativeReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for Promises
    }),
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 