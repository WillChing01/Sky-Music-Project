import { createSlice } from '@reduxjs/toolkit';
import reducers from './filterReducers';

const initialState = {
    channelsOpen: {
        albums: true, 
        artists: true, 
        tracks: true
    }, 
    genre: 'all', 
    showExplicit: true
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers
});

export const { setFilter, toggleExplicit, toggleChannelOpen } = filterSlice.actions;
export default filterSlice.reducer;
 
