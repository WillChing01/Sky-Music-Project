import History from "./History";

const getRandomIndex = (bound) => {
    return Math.floor(Math.random() * bound);
}

export default class Playlist {
    constructor(tracks, ) {
        this.masterTracks = tracks;
        this.tracks = tracks;
        this.isShuffle = false;
        this.progressIndex = 0;
        this.currentIndex = this.progressIndex;
        this.history = new History();
    }

    shuffle() {
        const tracks = this.tracks;
        const length = tracks.length;

        for (let i = length - 2; i >= 0; i--) {
            const j = getRandomIndex(length - 1);
            [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
        }

        const randIndex = getRandomIndex(length);
        const lastItemIndex = Math.min(randIndex + 1, length - 1);
        [tracks[randIndex], tracks[lastItemIndex]] = [tracks[lastItemIndex], tracks[randIndex]];

        this.isShuffle = true;
    }

    unshuffle() {
        this.tracks = this.masterTracks;
        this.isShuffle = false;
    }

    getCurrentTrack() {
        return this.tracks[this.currentIndex];
    }

    setTrack(track) {
        const trackIndex = this.getTrackIndex(track);
        if (this.isShuffle) {
            this.currentIndex = trackIndex;
        } else {
            this.progressIndex = trackIndex;
            this.currentIndex = this.progressIndex;
        }
    }

    setNextTrack() {
        const lastIndex = this.masterTracks.length - 1;
        const isAtLastTrack = this.progressIndex === lastIndex;

        this.history.push(this.getCurrentTrack());
        
        if (isAtLastTrack) {
            this.progressIndex = 0;
            this.currentIndex = 0;
            if (this.isShuffle) {
                this.shuffle();
            }
        } else {
            this.progressIndex++;
            this.currentIndex = this.progressIndex;
        }
    }

    getTrackIndex = (currentPreviewURL) => {
        for (const [index, info] of this.tracks.entries()) {
            const isCurrentTrack = info.currentPreviewURL === currentPreviewURL;
            if (isCurrentTrack) {
                return index;
            }
        }
        return -1;
    };

    setPreviousTrack() {
        const previousTrack = this.history.get();
        this.history.push(this.getCurrentTrack());
        
        const previousTrackIndex = this.getTrackIndex(previousTrack.currentPreviewURL);
        this.currentIndex = previousTrackIndex;
    }
}

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