import { createSlice } from '@reduxjs/toolkit';
import reducers from './playerConfigReducers';

const initialVolume = 0.2;

const initialState = {
    currentVolume: initialVolume,
    cachedVolume: initialVolume,
    isMuted: false,
    shouldLoop: false,
    //isShuffle: false,
    isPlaying: false
};

export const playerConfigSlice = createSlice({
    name: 'playerConfig',
    initialState,
    reducers
});

export const {
    setPlayerConfig, 
    setCurrentVolume, 
    setCachedVolume, 
    toggleIsMuted, 
    toggleShouldLoop, 
    //toggleIsShuffle,
    setIsPlaying,
    toggleIsPlaying
} = playerConfigSlice.actions;

export default playerConfigSlice.reducer;