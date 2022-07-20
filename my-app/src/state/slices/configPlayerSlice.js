import { createSlice, current } from '@reduxjs/toolkit';

const initialVolume = 0.2;

const initialState = {
    currentVolume: initialVolume,
    cachedVolume: initialVolume,
    isMuted: false,
    shouldLoop: false,
    isShuffle: false
};

export const configPlayerSlice = createSlice({
    name: 'configPlayer',
    initialState,
    reducers: {
        setConfigPlayer: (state, { payload }) => {
            return {...current(state), ...payload};
        },
        setCurrentVolume: (state, { payload }) => {
            state.currentVolume = payload;
        },
        setCachedVolume: (state, { payload }) => {
            state.cachedVolume = payload;
        },
        toggleIsMuted: (state) => {
            state.isMuted = !state.isMuted;
        },
        toggleShouldLoop: (state) => {
            state.shouldLoop = !state.shouldLoop;
        },
        toggleIsShuffle: (state) => {
            state.isShuffle = !state.isShuffle;
        },
    }
});

export const {
    setConfigPlayer, 
    setCurrentVolume, 
    setCachedVolume, 
    toggleIsMuted, 
    toggleShouldLoop, 
    toggleIsShuffle
} = configPlayerSlice.actions;
export default configPlayerSlice.reducer;