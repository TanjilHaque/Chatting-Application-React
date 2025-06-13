//store.js
import { configureStore } from '@reduxjs/toolkit';
import friendSlice from './slices/friendSlice';
import groupSlice from './slices/groupSlice' // <--- ADD THIS LINE

export const store = configureStore({
  reducer: {
    friend: friendSlice,
    group: groupSlice, // <--- ADD THIS LINE
    // ... other reducers
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});