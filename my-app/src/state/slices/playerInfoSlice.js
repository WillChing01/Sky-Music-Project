import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    currentPreviewURL: '',
    name: '', 
    artistName: '', 
    imgSrc: '', 
    isPlaying: false,
    trackList: [],
    playlist: [],
    hat: [],
    history: [t1, t2, null, l1, l2]
};

// initialTracks
// hat = initialTracks .. [] .. initialTracks
// history = [5 .., ]


export const playerInfoSlice = createSlice({
    name: 'playerInfo',
    initialState,
    reducers: {
        setPlayerInfo: (state, { payload }) => {
            return {...current(state), ...payload};
        },
        toggleIsPlaying: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        setTracklist: (state, { payload }) => {
            state.tracklist = payload;
        },
        setPlaylist: (state, { payload }) => {
            state.playlist = payload;
        },
        setNextTrack: (state) => {
            const nextTrack = hat.pop();
            if (!nextTrack) {

            }

            return {...current(state), ...nextTrack}
        }
    }
});

export const {setPlayerInfo, toggleIsPlaying, setPlaylist, revertPlaylist} = playerInfoSlice.actions;
export default playerInfoSlice.reducer;