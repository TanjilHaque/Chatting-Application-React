import { createSlice } from '@reduxjs/toolkit';

const groupSlice = createSlice({
  name: 'group',
  initialState: {
    joinedGroups: [], // Groups the current user is a member of
    availableGroups: [], // All public groups (or groups the user can join/discover)
    selectedGroup: null, // If you later want to view a specific group's details
    loading: false,
    error: null,
  },
  reducers: {
    setJoinedGroups: (state, action) => {
      state.joinedGroups = action.payload;
    },
    setAvailableGroups: (state, action) => {
      state.availableGroups = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
    // Add other reducers as needed for joining, leaving, etc.
  },
});

export const { setJoinedGroups, setAvailableGroups, setLoading, setError, setSelectedGroup } = groupSlice.actions;
export default groupSlice.reducer;