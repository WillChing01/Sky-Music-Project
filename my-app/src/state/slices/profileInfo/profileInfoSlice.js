import { createSlice } from '@reduxjs/toolkit';
import reducers from './profileInfoReducers';

const initialState = {
    isLoggedIn: true,
    favourites: []
};

export const profileInfoSlice = createSlice({
    name: 'profileInfo',
    initialState,
    reducers
});

export const { toggleIsLoggedIn, toggleFavouriteTrack } = profileInfoSlice.actions;
export default profileInfoSlice.reducer;