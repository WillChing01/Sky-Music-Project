import { createSlice } from '@reduxjs/toolkit';
import reducers from './profileInfoReducers';

const initialState = {
    favourites: [],
    darkMode: false
};

export const profileInfoSlice = createSlice({
    name: 'profileInfo',
    initialState,
    reducers
});

export const { toggleFavouriteTrack, setFavourites} = profileInfoSlice.actions;
export default profileInfoSlice.reducer;