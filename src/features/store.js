import { configureStore } from '@reduxjs/toolkit'
import friendSlice from './slices/friendSlice'

export const store = configureStore({
  reducer: {
    friend: friendSlice,
  },
})