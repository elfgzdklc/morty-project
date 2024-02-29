import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  characters: [],
  loading: false,
  error: null,
};

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    fetchCharactersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCharactersSuccess(state, action) {
      state.characters = action.payload;
      state.loading = false;
    },
    fetchCharactersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCharactersStart, fetchCharactersSuccess, fetchCharactersFailure } = characterSlice.actions;

export default characterSlice.reducer;
