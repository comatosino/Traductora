import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, UserState } from '../../types/app';
import { Translation } from '../../types/API';

export const initialState: UserState = {
  profile: { username: '', translations: [] },
  error: '',
  fetching: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    clearUser: (state) => {
      state.profile = {};
    },
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.fetching = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addTranslation: (state, action: PayloadAction<Translation>) => {
      state.profile.translations?.unshift(action.payload);
    },
    delTranslation: (state, action: PayloadAction<string>) => {
      state.profile.translations = state.profile.translations?.filter(
        (translation) => translation._id !== action.payload
      );
    },
  },
});

export const {
  setUser,
  clearUser,
  setFetching,
  addTranslation,
  delTranslation,
} = userSlice.actions;

export default userSlice.reducer;
