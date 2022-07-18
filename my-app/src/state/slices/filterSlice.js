import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    channelsOpen: {
        albums: true, 
        artists: true, 
        tracks: true
    }, 
    genre: 'all', 
    showExplicit: true
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, { payload }) => {
            return {...current(state), ...payload};
        },

        toggleExplicit: (state) => {
            state.showExplicit= !state.showExplicit;
        },

        toggleChannelOpen: (state, { payload }) => {
            const channel = payload;
            state.channelsOpen[channel] = !state.channelsOpen[channel];
        }
    }
});

export const { setFilter, toggleExplicit, toggleChannelOpen } = filterSlice.actions;
export default filterSlice.reducer;
 
