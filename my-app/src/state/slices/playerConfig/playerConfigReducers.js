import { current } from '@reduxjs/toolkit';

const setPlayerConfig =  (state, { payload }) => {
    return {...current(state), ...payload};
};

const setCurrentVolume = (state, { payload }) => {
    state.currentVolume = payload;
};

const setCachedVolume = (state, { payload }) => {
    state.cachedVolume = payload;
};

const toggleIsMuted = (state) => {
    state.isMuted = !state.isMuted;
};

const toggleShouldLoop = (state) => {
    state.shouldLoop = !state.shouldLoop;
};

const setIsPlaying = (state, { payload }) => {
    state.isPlaying = payload;
};

const toggleIsPlaying = (state) => {
    state.isPlaying = !state.isPlaying;
};

const reducers = {
    setPlayerConfig,
    setCurrentVolume,
    setCachedVolume,
    toggleIsMuted,
    toggleShouldLoop, 
    setIsPlaying,
    toggleIsPlaying
};

export default reducers;