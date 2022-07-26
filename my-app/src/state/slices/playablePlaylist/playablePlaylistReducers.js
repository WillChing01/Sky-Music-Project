import { 
    getHistory,
    pushHistory,
    createPlaylist,
    shufflePlaylist,
    unshufflePlaylist,
    getPlaylistTrack,
    setPlaylistTrack,
    setPlaylistNextTrack,
    setPlaylistPreviousTrack,
    getPlaylistTrackIndex
} from './playlistMutators';
import { current } from '@reduxjs/toolkit';

/**
 * Required when using a function that takes state as an argument and tries to modify it. 
 * This is because Immer uses a proxy state to 'allow' mutations.
 */
const mutateState = (func, state, action) => {
    const stateCopy = current(state);
    const deepCopy = JSON.parse(JSON.stringify(stateCopy)); // implement better way to get a deep copy
    func(deepCopy, action);
    return deepCopy;
}

// Reducers:

/**
 * When tracks load
 */
const pushPlaylist = (state, { payload }) => {
    const newPlaylist = createPlaylist(payload);
    state.playlistStack.push(newPlaylist);
};

/**
 * When playlist is no longer in scope
 */
const popPlaylist = (state) => {
    state.playlistStack.pop();
};

/**
 * When play icon is clicked
 */
const setTrack = (state, action) => {
    const func = (state, { payload }) => {
        const topPlaylist = state.playlistStack.at(-1);
        setPlaylistTrack(topPlaylist, payload);

        const currentPlaylist = state.currentPlaylist; 

        const shouldUpdate = topPlaylist !== currentPlaylist; // TODO may cause problems
        
        if (shouldUpdate) {
            state.currentPlaylist = topPlaylist;
        }
    }

    return mutateState(func, state, action);
};

/**
 * End of a song or when next track is clicked
 */
const nextTrack = (state) => {
    const func = (state) => {
        setPlaylistNextTrack(state.currentPlaylist)
    }
    return mutateState(func, state);
}

/**
 * When previous track is clicked
 */
const previousTrack = (state) => {
    const func = (state) => {
        setPlaylistPreviousTrack(state.currentPlaylist)
    }
    return mutateState(func, state);
}

/**
 * When shuffle is turned on
 */
 const shuffle = (state) => {
    const func = (state) => {
        for (const playlist of state.playlistStack) {
            shufflePlaylist(playlist);
        }
    }
    return mutateState(func, state);
}

/**
 * When shuffle is turned off
 */
 const unshuffle = (state) => {
    const func = (state) => {
        for (const playlist of state.playlistStack) {
            unshufflePlaylist(playlist);
        }
    }
    return mutateState(func, state);
}

const reducers = {
    pushPlaylist,
    popPlaylist,
    setTrack,
    nextTrack,
    previousTrack,
    shuffle,
    unshuffle
};

export default reducers;

