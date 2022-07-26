import Playlist from '../../../classes/Playlist';

// Reducers:

/**
 * When tracks load
 */
const pushPlaylist = (state, { payload }) => {
    const newPlaylist = new Playlist(payload);
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
const setTrack = (state, { payload }) => {
    const topPlaylist = state.playlistStack.at(-1);
    topPlaylist.setTrack(payload);

    const currentPlaylist = state.currentPlaylist; 

    const shouldUpdate = topPlaylist !== currentPlaylist; // TODO may cause problems
    
    if (shouldUpdate) {
        state.currentPlaylist = topPlaylist;
    }
};

/**
 * End of a song or when next track is clicked
 */
const nextTrack = (state) => {
    state.currentPlaylist.nextTrack();
}

/**
 * When previous track is clicked
 */
const previousTrack = (state) => {
    state.currentPlaylist.previousTrack();
}

/**
 * When shuffle is clicked
 */
const toggleShuffle = (state, { payload }) => {
    //const isShuffle = state.currentPlaylist.
    if (payload.isShuffle) {
        state.currentPlaylist.shuffle();
    } else {
        state.currentPlaylist.unshuffle();
    }
}

const reducers = {
    pushPlaylist,
    popPlaylist,
    setTrack,
    nextTrack,
    previousTrack,
    toggleShuffle
};

export default reducers;

