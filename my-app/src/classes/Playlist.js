export default class Playlist {
    constructor(tracks) {
        this.masterTracks = tracks;
        this.tracks = tracks;
        this.currentTrack = 0;
    }

    shuffle() {
        const length = this.tracks.length - 1;
        for (let i = length; i >= 0; i--) {
            const j = Math.floor(Math.random() * length);
            [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
        }
    }

}