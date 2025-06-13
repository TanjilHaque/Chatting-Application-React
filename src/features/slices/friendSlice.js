//friendSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    
  },
}

export const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
   FriendAction : (state, action)=>{
    state.value = action.payload
   }
  },
})

// Action creators are generated for each case reducer function
export const { FriendAction } = friendSlice.actions

export default friendSlice.reducer