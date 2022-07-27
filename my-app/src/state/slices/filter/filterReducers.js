import {  current } from '@reduxjs/toolkit';

const setFilter = (state, { payload }) => {
    return {...current(state), ...payload};
};

const toggleExplicit = (state) => {
    state.showExplicit= !state.showExplicit;
};

const toggleChannelOpen = (state, { payload }) => {
    const channel = payload;
    state.channelsOpen[channel] = !state.channelsOpen[channel];
};

const reducers = {
    setFilter, 
    toggleExplicit,
    toggleChannelOpen
};

export default reducers;