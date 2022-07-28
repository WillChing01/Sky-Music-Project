import { 
    createPlaylist,
    shufflePlaylist,
    unshufflePlaylist,
    setPlaylistTrack,
    setPlaylistNextTrack,
    setPlaylistPreviousTrack,
} from './playlistMutators';

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

const swapPlaylist = (state, { payload }) => {
    const newPlaylist = createPlaylist(payload);
    state.playlistStack.pop();
    state.playlistStack.push(newPlaylist);
}

/**
 * When play icon is clicked
 */
const setTrack = (state, { payload }) => {
    const topPlaylist = state.playlistStack.at(-1);
    const currentPlaylist = state.currentPlaylist; 
    const shouldUpdate = topPlaylist.id !== currentPlaylist.id;
    
    if (shouldUpdate) {
        const isShuffle = state.isShuffle;

        if (isShuffle) shufflePlaylist(topPlaylist);
        setPlaylistTrack(topPlaylist, payload, isShuffle);
        state.currentPlaylist = topPlaylist;
    } else {
        setPlaylistTrack(currentPlaylist, payload, state.isShuffle);
    }
};

/**
 * End of a song or when next track is clicked
 */
const nextTrack = (state) => {
    setPlaylistNextTrack(state.currentPlaylist, state.isShuffle);
}

/**
 * When previous track is clicked
 */
const previousTrack = (state) => {
    setPlaylistPreviousTrack(state.currentPlaylist)
}

/**
 * When shuffle is turned on
 */
 const shuffle = (state) => {
    shufflePlaylist(state.currentPlaylist);
    state.isShuffle = true;
}

/**
 * When shuffle is turned off
 */
 const unshuffle = (state) => {
    unshufflePlaylist(state.currentPlaylist);
    state.isShuffle = false;
}

const reducers = {
    pushPlaylist,
    popPlaylist,
    swapPlaylist,
    setTrack,
    nextTrack,
    previousTrack,
    shuffle,
    unshuffle
};

export default reducers;

