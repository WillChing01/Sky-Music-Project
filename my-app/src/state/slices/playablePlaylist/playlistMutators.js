const mod = (n, m) => {
    return ((n % m) + m) % m;
};

const createHistory = (limit = 50) => {
    const length = limit + 1;
    const tracks = new Array(length);
    tracks.fill({});
    Object.seal(tracks);
    const current = 0;
    const top = 0;
    tracks[top] = null

    return {
        length,
        tracks,
        current,
        top
    }
};

// formerly get
export const getHistory = (history) => {
    const nothingLeft = history.tracks[history.current] === null;
    if (nothingLeft) return null;
    const track = history.tracks[history.current];
    history.current = mod(history.current - 1, history.length);
    return track;
};

// formerly push
export const pushHistory = (history, track) => {
    const newTop = mod(history.top + 1, history.length);
    const isFull = history.tracks[newTop] === null;
    if (isFull) {
        const newEnd = mod(newTop + 1, history.length);
        history.tracks[newEnd] = null;
    }
    history.top = newTop;
    history.tracks[history.top] = track;
};


// --------------------------------------------------------------------------------------------


const getRandomIndex = (bound) => {
    return Math.floor(Math.random() * bound);
}

const defaultTrack = {
    currentPreviewURL: '',
    name: '',
    artistName: '',
    imgSrc: ''
}

export const createPlaylist = (tracks = [defaultTrack]) => {
    const masterTracks = tracks;
    const isShuffle = false; // some how need to update this
    const progressIndex = 0;
    const currentIndex = progressIndex;
    const history = createHistory();
    return {
        masterTracks,
        tracks,
        isShuffle,
        progressIndex,
        currentIndex,
        history 
    }
};

// formerly shuffle
export const shufflePlaylist = (playlist) => {
    const tracks = playlist.tracks;
    const length = tracks.length;

    for (let i = length - 2; i >= 0; i--) {
        const j = getRandomIndex(length - 1);
        [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
    }

    const randIndex = getRandomIndex(length);
    const lastItemIndex = Math.min(randIndex + 1, length - 1);
    [tracks[randIndex], tracks[lastItemIndex]] = [tracks[lastItemIndex], tracks[randIndex]];

    playlist.isShuffle = true;
};

// formerly unshuffle
export const unshufflePlaylist = (playlist) => {
    playlist.tracks = playlist.masterTracks;
    playlist.isShuffle = false;
};

// formerly getCurrentTrack
export const getPlaylistTrack = (playlist) => {
    return playlist.tracks[playlist.currentIndex];
};

// formerly setTrack
export const setPlaylistTrack = (playlist, track) => {
    const trackIndex = getPlaylistTrackIndex(playlist, track);
    if (playlist.isShuffle) {
        playlist.currentIndex = trackIndex;
    } else {
        playlist.progressIndex = trackIndex;
        playlist.currentIndex = playlist.progressIndex;
    }
};

// formerly setNextTrack
export const setPlaylistNextTrack = (playlist) => {
    const lastIndex = playlist.masterTracks.length - 1;
    const isAtLastTrack = playlist.progressIndex === lastIndex;

    const currentTrack = getPlaylistTrack(playlist);
    pushHistory(playlist.history, currentTrack);
    playlist.history.current = playlist.history.top
    
    if (isAtLastTrack) {
        playlist.progressIndex = 0;
        playlist.currentIndex = 0;
        if (playlist.isShuffle) {
            shufflePlaylist(playlist);
        }
    } else {
        playlist.progressIndex++;
        playlist.currentIndex = playlist.progressIndex;
    }
};

// formerly setPreviousTrack
export const setPlaylistPreviousTrack = (playlist) => {
    console.log(playlist.history)
    const previousTrack = getHistory(playlist.history);
    if (previousTrack === null) return;
    const currentTrack = getPlaylistTrack(playlist);
    pushHistory(playlist.history, currentTrack);
    
    const previousTrackIndex = getPlaylistTrackIndex(playlist, previousTrack);
    playlist.currentIndex = previousTrackIndex;
}

// formerly getTrackIndex
export const getPlaylistTrackIndex = (playlist, track) => {
    for (const [index, info] of playlist.tracks.entries()) {
        const isCurrentTrack = info.currentPreviewURL === track.currentPreviewURL;
        if (isCurrentTrack) {
            return index;
        }
    }
    return -1;
};

// tracks:
// a, b, c, d, e
//          ^
// history:
// a, b, c

// tracks:
// a, b, c, d, e
//       ^   
// history:
// a, b, c, d

// tracks:
// a, b, c, d, e
//    ^     
// history:
// a, b, c, d, c

// tracks:
// a, b, c, d, e
//             ^     
// history:
// a, b, c, d, c, b