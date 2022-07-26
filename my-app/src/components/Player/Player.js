import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextTrack, previousTrack } from '../../state/slices/playablePlaylist/playablePlaylistSlice';

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
    const isPlaying = useSelector((state) => state.playerInfo);
    const { currentPreviewURL } = useSelector((state) => state.playablePlaylist.currentPlaylist.getCurrentTrack());

    const dispatch = useDispatch();

    const togglePlayAudio = useCallback(() => {
        const playerAudio = getPlayerAudio();
        if (isPlaying) playerAudio.play();
        else playerAudio.pause();
    }, [isPlaying]);

    useEffect(() => {
        togglePlayAudio();

    }, [togglePlayAudio]);

    const setNextTrack = () => {
        restartPlayer();
        dispatch(nextTrack())
    };

    const setPreviousTrack = () => {
        restartPlayer();
        dispatch(previousTrack());
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