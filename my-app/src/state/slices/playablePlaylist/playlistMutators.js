import { current } from '@reduxjs/toolkit';

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

let id = 0;
const generateNewId = () => {
    return id++;
}

const defaultTrack = {
    id: '',
    currentPreviewURL: '',
    name: '',
    artistName: '',
    imgSrc: ''
}

export const createPlaylist = (tracks = [defaultTrack]) => {
    const id = generateNewId();
    const masterTracks = tracks;
    const progressIndex = 0;
    const currentIndex = progressIndex;
    const playingTrack = tracks[currentIndex];
    const history = createHistory();
    return {
        id,
        masterTracks,
        tracks,
        progressIndex,
        currentIndex,
        playingTrack,
        history 
    }
};

export const shufflePlaylist = (playlist) => {
    const tracks = playlist.tracks;
    const length = tracks.length;
    
    playlist.progressIndex = 0;
    playlist.currentIndex = 0;

    for (let i = length - 1; i >= 0; i--) {
        const j = getRandomIndex(i + 1);
        [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
    }

    const playingIndex = getPlaylistTrackIndex(playlist, playlist.playingTrack);
    [tracks[0], tracks[playingIndex]] = [tracks[playingIndex], tracks[0]];
};

export const unshufflePlaylist = (playlist) => {
    playlist.tracks = playlist.masterTracks;
    const currentTrackIndex = getPlaylistTrackIndex(playlist, playlist.playingTrack);
    playlist.currentIndex = currentTrackIndex;
    playlist.progressIndex = currentTrackIndex;
};

const setPlayingTrack = (playlist) => {
    const tracks = playlist.tracks;
    const currentIndex = playlist.currentIndex;
    playlist.playingTrack = tracks[currentIndex];
    return playlist.tracks[playlist.currentIndex];
};

const updateHistory = (playlist) => {
    const currentTrack = playlist.playingTrack; 
    pushHistory(playlist.history, currentTrack);
    playlist.history.current = playlist.history.top
}

const setNextIndex = (playlist) => {
    const length = playlist.tracks.length;
    const nextIndex = mod(playlist.progressIndex + 1, length);
    playlist.progressIndex = nextIndex;
    playlist.currentIndex = nextIndex;
}

export const setPlaylistTrack = (playlist, track, isShuffle) => {
    const trackIndex = getPlaylistTrackIndex(playlist, track);
    updateHistory(playlist);
    
    if (isShuffle) {
        playlist.currentIndex = trackIndex;
    } else {
        playlist.progressIndex = trackIndex;
        playlist.currentIndex = playlist.progressIndex;
    }
    setPlayingTrack(playlist);
};

export const setPlaylistNextTrack = (playlist, isShuffle) => {
    const lastIndex = playlist.masterTracks.length - 1;
    const isAtLastTrack = playlist.progressIndex === lastIndex;

    updateHistory(playlist);
    
    if (isAtLastTrack) {
        if (isShuffle) {
            shufflePlaylist(playlist);
            setNextIndex(playlist);
        }
    } else {
        playlist.progressIndex++;
        playlist.currentIndex = playlist.progressIndex;
    }
    setPlayingTrack(playlist);
};

export const setPlaylistPreviousTrack = (playlist) => {
    const previousTrack = getHistory(playlist.history);
    if (previousTrack === null) return;
    const currentTrack = playlist.playingTrack;
    pushHistory(playlist.history, currentTrack);
    
    const previousTrackIndex = getPlaylistTrackIndex(playlist, previousTrack);
    playlist.currentIndex = previousTrackIndex;
    setPlayingTrack(playlist);
}

export const getPlaylistTrackIndex = (playlist, track) => {
    for (const [index, trackInfo] of playlist.tracks.entries()) {
        const isCurrentTrack = trackInfo.id === track.id;
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