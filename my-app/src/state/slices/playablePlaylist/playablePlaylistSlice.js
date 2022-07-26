import { createSlice } from '@reduxjs/toolkit';
import reducers from './playablePlaylistReducers';

const initialState = {
    currentPlaylist: {},
    isShuffle: false,
    playlistStack: []
};

export const playablePlaylist = createSlice({
    name: 'playablePlaylist',
    initialState,
    reducers
});

export const {
    pushPlaylist,
    popPlaylist,
    setTrack,
    nextTrack,
    previousTrack,
    toggleShuffle
} = playablePlaylist.actions;

export default playablePlaylist.reducer;