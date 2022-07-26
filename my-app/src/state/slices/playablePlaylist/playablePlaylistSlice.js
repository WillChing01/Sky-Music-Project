import { createSlice } from '@reduxjs/toolkit';
import {createPlaylist} from './playlistMutators';
import reducers from './playablePlaylistReducers';

const initialPlaylist = createPlaylist();

const initialState = {
    currentPlaylist: initialPlaylist,
    playlistStack: [initialPlaylist]
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
    shuffle,
    unshuffle
} = playablePlaylist.actions;

export default playablePlaylist.reducer;