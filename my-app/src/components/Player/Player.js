import { useEffect } from 'react';
import { useSelector } from 'react-redux';

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
}

export const setPlayerAudioLoop = (newShouldLoop) => {
    const playerAudio = getPlayerAudio();
    playerAudio.loop = newShouldLoop;
};

const Player = () => {
    const {
        currentPreviewURL,
        isPlaying
    } = useSelector((state) => state.playerInfo);

    useEffect(() => {
        const togglePlayAudio = () => {
            const playerAudio = getPlayerAudio();
            if (isPlaying) playerAudio.play();
            else playerAudio.pause();
        };
    
        togglePlayAudio();
    }, [isPlaying]);

    return (
        <div className='bottomscreen'>
            <audio id='player-audio' src={currentPreviewURL} type='audio/mp3' autoPlay preload='metadata'></audio>
            <TrackInfoSnippet />
            <div className='center-position'>
                <TrackControls 
                currentPreviewURL={currentPreviewURL}
                isPlaying={isPlaying}
                />
                <ProgressBar />
            </div>
            <span className='region'/>
            <VolumeControl />
        </div>
    );
}

export default Player;