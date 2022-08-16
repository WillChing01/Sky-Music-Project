import { createSlice } from '@reduxjs/toolkit';
import reducers from './profileInfoReducers';

const getCachedDarkMode = () => {
    try {
        const darkMode = localStorage.getItem('darkMode') === 'true' ? true 
                                                                     : false;
        return darkMode;
    } catch {
        return false;
    }
};

const initialState = {
    favourites: [],
    darkMode: getCachedDarkMode()
};

export const profileInfoSlice = createSlice({
    name: 'profileInfo',
    initialState,
    reducers
});

export const { toggleFavouriteTrack, setFavourites, toggleDarkMode } = profileInfoSlice.actions;
export default profileInfoSlice.reducer;