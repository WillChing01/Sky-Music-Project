import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIsPlaying } from '../../state/slices/playerInfoSlice';
import { truncateStr } from '../../utility/format/formatStr';

import ProgressBar from '../ProgressBar/ProgressBar';
import TrackControls from '../TrackControls/TrackControls';
import VolumeControl from '../VolumeControl/VolumeControl';

import './Player.css';

const tinyTimeIncrement = 0.0001;
const volumeIncrement = 0.05;
const skipIncrement = 5;


export const getPlayerAudio = () => {
    const playerAudio = document.getElementById('player-audio');
    return playerAudio;
};

export const setPlayerAudioCurrentTime = (newTime) => {
    const playerAudio = getPlayerAudio();
    playerAudio.currentTime = newTime;
};

const Player = () => {
    const {
        currentPreviewURL,
        name, 
        artistName, 
        imgSrc, 
        isPlaying
    } = useSelector((state) => state.playerInfo);
    const [currentVolume, setCurrentVolume] = useState(0.2);
    const [cachedVolume, setCachedVolume] = useState(0.2);
    const [isMuted, setIsMuted] = useState(false);
    const [shouldLoop, setShouldLoop] = useState(false);
    const [isShuffle, setShuffle] = useState(false);
    
    const dispatch = useDispatch();

    const setPlayerAudioVolume = (newPlayerAudioVolume) => {
        const playerAudio = getPlayerAudio();
        playerAudio.volume = newPlayerAudioVolume;
    }

    const setPlayerAudioLoop = (newShouldLoop) => {
        const playerAudio = getPlayerAudio();
        playerAudio.loop = newShouldLoop;
    };

    const setInitialPlayerAudioVolume = () => {
        setPlayerAudioVolume(currentVolume);
    };

    const givenTrackLoadedIntoPlayer = (effect) => {
       const isTrackLoadedIntoPlayer = !!currentPreviewURL;
       if (isTrackLoadedIntoPlayer) {
           effect();
       }
   };

    const togglePlayAudio = () => {
        const playerAudio = getPlayerAudio();
        if (isPlaying) playerAudio.play();
        else playerAudio.pause();
    };
    
    const handleToggleIsPlaying = () => {
        const effect = () => {
            dispatch(toggleIsPlaying());
        };

        givenTrackLoadedIntoPlayer(effect);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const toggleShuffleTracks = () => {
        setShuffle(!isShuffle);
    };

    const toggleLoopTrack = () => {
        setPlayerAudioLoop(!shouldLoop);
        setShouldLoop(!shouldLoop);
    };

    const handleUnmuteOnVolumeChange = (newVolume) => {
        const shouldUnmute = isMuted && newVolume !== 0;
        if (shouldUnmute) setIsMuted(false);
    };

    const handleVolumeSliderChange = (e) => {
        const newVolume = parseFloat(e.target.value)/100;
        setPlayerAudioVolume(newVolume);
        setCurrentVolume(newVolume);
        handleUnmuteOnVolumeChange(newVolume);
    };

    const handleClickVolumeIcon = () => {
        if (isMuted) {
            setCurrentVolume(cachedVolume);
            setPlayerAudioVolume(cachedVolume);
        } else {
            setCachedVolume(currentVolume);
            setCurrentVolume(0);
            setPlayerAudioVolume(0);
        }
        toggleMute();
    };

    const jumpVolume = (direction) => {
        let newVolume = currentVolume;
        switch (direction) {
            case 'up':
                newVolume = Math.min(newVolume + volumeIncrement, 1);
                break;
            case 'down':
                newVolume = Math.max(newVolume - volumeIncrement, 0);
                break;
            default:
                break;
        }
        setPlayerAudioVolume(newVolume);
        setCurrentVolume(newVolume);
    };
    
    const previousTrack = () => {
        const effect = () => {
            setPlayerAudioCurrentTime(0);
        };

        givenTrackLoadedIntoPlayer(effect);
    };

    const nextTrack = () => {
        const effect = () => {
            const playerAudio = getPlayerAudio();
            const trackDuration = playerAudio.duration;
            const newPlayerAudioTime = trackDuration - tinyTimeIncrement;
            setPlayerAudioCurrentTime(newPlayerAudioTime);  
        };

        givenTrackLoadedIntoPlayer(effect);
    };

    const skipForwards = () => {
        const effect = () => {
            const playerAudio = getPlayerAudio();
            const currentPlayerAudioTime = playerAudio.currentTime;
            const trackDuration = playerAudio.duration;
            const prePauseDuration = trackDuration - tinyTimeIncrement; 
            const candidatePlayerAudioTime = currentPlayerAudioTime + skipIncrement;
            const newPlayerAudioTime = Math.min(prePauseDuration, candidatePlayerAudioTime);
            setPlayerAudioCurrentTime(newPlayerAudioTime);
        };

        givenTrackLoadedIntoPlayer(effect);
    };

    const skipBackwards = () => {
        const effect = () => {
            const playerAudio = getPlayerAudio();
            const currentPlayerAudioTime = playerAudio.currentTime;
            const candidatePlayerAudioTime = currentPlayerAudioTime - skipIncrement;
            const newPlayerAudioTime = Math.max(0, candidatePlayerAudioTime);
            setPlayerAudioCurrentTime(newPlayerAudioTime);
        };

        givenTrackLoadedIntoPlayer(effect);
    };

    const handleKeyPress = (e) => {
        if (document.activeElement.type !== 'search') {
            const key = e.key.toLowerCase();
            switch (key) {
                case 'm':
                    handleClickVolumeIcon();
                    break;
                case 'k':
                    handleToggleIsPlaying();
                    break;
                case 'j':
                    previousTrack();
                    break;
                case 'l':
                    nextTrack();
                    break;
                case ']':
                    jumpVolume('up');
                    break;
                case '[':
                    jumpVolume('down');
                    break;
                case 'arrowleft':
                    skipBackwards();
                    break;
                case 'arrowright':
                    skipForwards();
                    break;
                default:
                    break;
            }
        }
     };

    useEffect(() => {
        const subToKeyPress = () => {
            document.addEventListener('keydown', handleKeyPress);
        };
        const unsubFromKeyPress = () => {
            document.removeEventListener('keydown', handleKeyPress);
        };

        setInitialPlayerAudioVolume();
        subToKeyPress();

        return unsubFromKeyPress;
    }, []);

    useEffect(() => {
        togglePlayAudio();
    }, [isPlaying]);

    const getTrackName = () => {
        const truncatedTrackName = truncateStr(name, 20, true);
        return truncatedTrackName;
    };

    const getArtistName = () => {
        const truncatedArtistName = truncateStr(artistName, 20, true);
        return truncatedArtistName;
    };

    return (
        <div className='bottomscreen'>
            <audio id='player-audio' src={currentPreviewURL} type='audio/mp3' autoPlay preload='metadata'></audio>
            <img id='player-icon' src={imgSrc}></img>
            <ul className='no-bullets'>
                <li>
                    <span className='make-bold'>{getTrackName()}</span>
                </li>
                <li>
                    <span>{getArtistName()}</span>
                </li>
            </ul>
            <div className='center-position'>
                <div className='spread'>
                    {
                    isShuffle === true ?
                    <i className='bi-shuffle icon-selected' onClick={toggleShuffleTracks}></i> :
                    <i className='bi-shuffle icon' onClick={toggleShuffleTracks}></i>
                    }
                    <i className='bi-skip-backward icon' onClick={previousTrack}></i>
                    {
                    isPlaying === true ?
                    <i className='bi-pause icon' onClick={handleToggleIsPlaying}></i> :
                    <i className='bi-play icon' onClick={handleToggleIsPlaying}></i>
                    }
                    <i className='bi-skip-forward icon' onClick={nextTrack}></i>
                    {
                    shouldLoop === true ?
                    <i className='bi-arrow-repeat icon-selected' onClick={toggleLoopTrack}></i> :
                    <i className='bi-arrow-repeat icon' onClick={toggleLoopTrack}></i>
                    }
                </div>
                <ProgressBar />
            </div>
            <span className='region'/>
            {
            currentVolume === 0 ?
            <i className='bi-volume-mute icon' onClick={handleClickVolumeIcon}></i> :
            <i className='bi-volume-up icon' onClick={handleClickVolumeIcon}></i>
            }
            <input type='range' min='0' max='100' value={currentVolume*100} onChange={handleVolumeSliderChange}/>
        </div>
    );
}

export default Player;