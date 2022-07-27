import { createSlice } from '@reduxjs/toolkit';
import reducers from './profileInfoReducers';

const initialState = {
    isLoggedIn: false,
    favourites: [],
    playlists: []
};

export const profileInfoSlice = createSlice({
    name: 'profileInfo',
    initialState,
    reducers
});

export const { toggleIsLoggedIn } = profileInfoSlice.actions;
export default profileInfoSlice.reducer;