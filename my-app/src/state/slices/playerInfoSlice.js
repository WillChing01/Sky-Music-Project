import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    currentPreviewURL: '',
    name: '', 
    artistName: '', 
    imgSrc: '', 
    isPlaying: false
};

export const playerInfoSlice = createSlice({
    name: 'playingInfo',
    initialState,
    reducers: {
        setPlayingInfo: (state, { payload }) => {
            return {...current(state), ...payload};
        },

        togglePlaying: (state) => {
            state.isPlaying = !state.isPlaying;
        }
    }
});

export const { setPlayerInfo, togglePlaying } = playerInfoSlice.actions;
export default playerInfoSlice.reducer;