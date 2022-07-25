import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    currentPreviewURL: '',
    name: '', 
    artistName: '', 
    imgSrc: '', 
    isPlaying: false,
    playlist: [],
    cachedPlaylist: []
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
        },
        setPlaylist: (state, { payload }) => {
            state.cachedPlaylist = state.playlist;
            state.playlist = payload;
        },
        revertPlaylist: (state) => {
            state.playlist = state.cachedPlaylist;
            state.cachedPlaylist = [];
        }
    }
});

export const { setPlayerInfo, toggleIsPlaying, setPlaylist, revertPlaylist} = playerInfoSlice.actions;
export default playerInfoSlice.reducer;