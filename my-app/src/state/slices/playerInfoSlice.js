import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    currentPreviewURL: '',
    name: '', 
    artistName: '', 
    imgSrc: '', 
    isPlaying: false
};

export const playerInfoSlice = createSlice({
    name: 'playerInfo',
    initialState,
    reducers: {
        setPlayerInfo: (state, { payload }) => {
            return {...current(state), ...payload};
        },
        toggleIsPlaying: (state) => {
            state.isPlaying = !state.isPlaying;
        }
    }
});

export const { setPlayerInfo, toggleIsPlaying } = playerInfoSlice.actions;
export default playerInfoSlice.reducer;