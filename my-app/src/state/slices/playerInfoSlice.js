import { createSlice, current } from '@reduxjs/toolkit';
import { getAlbumTracksInfo } from '../../utility/fetchNapster';

const initialState = {
    currentPreviewURL: '',
    name: '', 
    artistName: '', 
    imgSrc: '', 
    isPlaying: false,
    currentPlaylist,
    playlistStack: [],
};

/*
load page
push on home tracks
dispatch(setCurrentPlaylist({payload: {
    playist,
    shouldShuffle

}}));

then 
push on the core playlist
if (action.payload.shouldShuffle) {
    update current playlist w/shuffled v
}


shuffle turned on
dispatch(toggleShuffleCurrentPlaylist())

state.currentPlaylist = shuffled version

get the history of state.currentPlaylist
state.currentPlaylist = {...the one of the top of the stack, history: state.currentPlaylist.history}


unshuffle turned on
dispatch(toggle..)
open dialog
push on album tracks
// same thing
close dialog
pop off album tracks




currentPlaylist
playlistStack = {, }
{
    id: 
    tracks: {
        items: [t4, t5, t4, t5, t4, t5, t4, t5],
        index:
    } 
    history: t2
}


*/

/*
Rule: If I press the play icon for a track, then press forwards or backwards, I look for 
the next or previous track in the playlist at the top of
stack. 

This makes sense because the track UI belongs to the 
the 'scope' of the most-recently rendered playlist-defining 
component. 

when ViewContainer loads tracks; it pushes homeTracks on to the stack
[homeTracks]

when Dialog opens; it pushes on albumTracks to the stack
[homeTracks, albumTracks]

when Dialog closes; it takes albumTracks off of the stack
[homeTracks]
*/

// types of playlist: album dialog one, tracks loaded onto page, favourited playlists (e.g. album), 
// created playlists

/*
playlist has an id
trigger component: can change the id
flag component: read in the id

PlayIcon can be a trigger component
WrapAlbum could be a trigger and flag component
ViewContainer could be a flag component

playlistId:
playist:

shuffling, local history

*/

let playlistId = 0;
const getNewPlaylistId = () => {
    return playlistId++;
};


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

        pushPlaylist: (state, { payload }) => {
            const newPlaylist = {
                id: getNewPlaylistId(),
                tracks: payload,
                history: []
            };
            state.playlistStack.push(newPlaylist);
        },

        updatePlaylist: (state) => {
            const playlistAtTop = state.playlistStack.at(-1);
            const stackPlaylistId = playlistAtTop.id;
            const currentPlaylistId = state.currentPlaylist.id;           
            if (currentPlaylistId !== stackPlaylistId) {
                state.currentPlaylist = playlistAtTop;
            }
        },

        nextTrack: (state) => {
            const { items, index } = state.currentPlaylist.tracks;
            const currentTrack = items[index];
            const nextTrack = items[++index];            
            state.currentPlaylist.history.push(currentTrack);
            return {...current(state), ...nextTrack};
        },

        previousTrack: (state, { payload }) => {
            if (payload.isShuffle) {
                const prevTrack = state.currentPlaylist.history.pop();
                return {...current(state), ...prevTrack};
            } else {
                const { items, index } = state.currentPlaylist.tracks;
                const previousTrack = items[--index];
                return {...current(state), ...previousTrack};
            }
        }
    }
});

export const {setPlayerInfo, toggleIsPlaying, setPlaylist, revertPlaylist} = playerInfoSlice.actions;
export default playerInfoSlice.reducer;