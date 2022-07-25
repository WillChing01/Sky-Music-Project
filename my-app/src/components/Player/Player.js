import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerInfo } from '../../state/slices/playerInfoSlice';

import ProgressBar from '../ProgressBar/ProgressBar';
import TrackControls from '../TrackControls/TrackControls';
import VolumeControl from '../VolumeControl/VolumeControl';
import TrackInfoSnippet from '../TrackInfoSnippet/TrackInfoSnippet';

import './Player.css';

export const getPlayerAudio = () => {
    const playerAudio = document.getElementById('player-audio');
    return playerAudio;
};

export const setPlayerAudioCurrentTime = (newTime) => {
    const playerAudio = getPlayerAudio();
    playerAudio.currentTime = newTime;
};

export const setPlayerAudioVolume = (newPlayerAudioVolume) => {
    const playerAudio = getPlayerAudio();
    playerAudio.volume = newPlayerAudioVolume;
};

export const setPlayerAudioLoop = (newShouldLoop) => {
    const playerAudio = getPlayerAudio();
    playerAudio.loop = newShouldLoop;
};

const Player = () => {
    const {
        currentPreviewURL,
        isPlaying,
        playlist
    } = useSelector((state) => state.playerInfo);

    const isShuffle = useSelector((state) => state.configPlayer.isShuffle)

    const dispatch = useDispatch();

    const togglePlayAudio = useCallback(() => {
        const playerAudio = getPlayerAudio();
        if (isPlaying) playerAudio.play();
        else playerAudio.pause();
    }, [isPlaying]);  

    useEffect(() => {
        togglePlayAudio();

    }, [togglePlayAudio]);

    const getTrackIndex = () => {
        for (const [index, info] of playlist.entries()) {
            const isCurrentTrackInPlayer = info.currentPreviewURL === currentPreviewURL;
            if (isCurrentTrackInPlayer) {
                return index;
            }
        }
        return -1;
    };

    const setNthTrackFromCurrent = (n) => {
        let currentIndex = getTrackIndex();
        const shuffleOffset = isShuffle ? n : 0;
        // If track was not found (e.g., the user clicked an album that the current song isn't in) play song at shuffleOffset
        const offset = currentIndex !== -1 ? (currentIndex + n) % playlist.length 
                                            : shuffleOffset;
        const nextTrack = playlist[offset];
        nextTrack.playlistId
        dispatch(setPlayerInfo(nextTrack));
    };

    
    
    // const setNthTrackFromCurrent = (n) => {
    //     // Get index of current track
    //     let currentIndex;
    //     for (const [i, info] of playlist.entries()) {
    //         if (info.currentPreviewURL == currentPreviewURL) {
    //             currentIndex = i;
    //             break;
    //         }
    //     }
    //     const shuffleOffset = isShuffle ? n : 0;
    //     // If track was not found (e.g., the user clicked an album that the current song isn't in) play song at shuffleOffset
    //     const offset = currentIndex !== undefined ? (currentIndex + n) % playlist.length : shuffleOffset;
    //     const nextTrack = playlist[offset];
    //     dispatch(setPlayerInfo(nextTrack))
    // };


    const setShuffleTrack = () => {
        const randomOffset = Math.floor(Math.random() * playlist.length);
        setNthTrackFromCurrent(randomOffset);
    };

    const setNextTrack = () => {
        restartPlayer();
        if (isShuffle) setShuffleTrack();
        else setNthTrackFromCurrent(1);
    };

    const setPreviousTrack = () => {
        restartPlayer();
        const previousIndexDistance = playlist.length - 1;
        if (isShuffle) setShuffleTrack();
        else setNthTrackFromCurrent(previousIndexDistance);
    };

    const restartPlayer = () => {
        setPlayerAudioCurrentTime(0);
    };

    return (
        <div className='bottomscreen'>
            <audio id='player-audio' src={currentPreviewURL} type='audio/mp3' onCanPlayThrough={togglePlayAudio} onEnded={setNextTrack} preload='metadata'></audio>
            <div className='left-panel'>
                <TrackInfoSnippet />
            </div>
            <div className='center-position'>
                <TrackControls 
                    currentPreviewURL={currentPreviewURL}
                    isPlaying={isPlaying}
                    setNextTrack={setNextTrack}
                    setPreviousTrack={setPreviousTrack}
                />
                <ProgressBar />
            </div>
            <span className='region'/>
            <VolumeControl />
        </div>
    );
}

export default Player;