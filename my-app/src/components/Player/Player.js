import { useState, useEffect, useCallback } from 'react';
import { truncateStr } from '../../utility/formatStr';

import CustomPlayer from '../CustomPlayer/CustomPlayer';

import './Player.css';

const tinyTimeIncrement = 0.0001;
const volumeIncrement = 0.05;
const skipIncrement = 5;

const Player = ({ playingInfo, setPlayingInfo }) => {
    const { currentPreviewURL , name, artistName, imgSrc, play } = playingInfo;
    const [currentVolume, setCurrentVolume ] = useState(0.2);
    const [cachedVolume, setCachedVolume] = useState(0.2);
    const [isMuted, setIsMuted] = useState(false);
    const [shouldLoop, setShouldLoop] = useState(false);
    const [isShuffle, setShuffle] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    
    const getPlayerAudio = () => {
        const playerAudio = document.getElementById('player-audio');
        return playerAudio;
    };

    const setPlayerAudioVolume = (newPlayerAudioVolume) => {
        const playerAudio = getPlayerAudio();
        playerAudio.volume = newPlayerAudioVolume;
    }

    const setPlayerAudioCurrentTime = (newTime) => {
        console.log("New time is ", newTime);
        const playerAudio = getPlayerAudio();
        playerAudio.currentTime = newTime;
    };

    const setPlayerAudioLoop = (newShouldLoop) => {
        const playerAudio = getPlayerAudio();
        playerAudio.loop = newShouldLoop;
    };

    const setInitialPlayerAudioVolume = () => {
        setPlayerAudioVolume(currentVolume);
    };

    const givenTrackLoadedIntoPlayer = (effect) => {
        /* What is this first line below? I want to make it clear that isTrackLoadedIntoPlayer
       is being used in a boolean capacity. It doesn't matter that the !! is logically 
       unnecessary. If you're the second person to read this, please mark your name:
       
       Seen by: Adam

       If you're the third person to read this, please delete the comment.
       */
       const isTrackLoadedIntoPlayer = !!currentPreviewURL;
       if (isTrackLoadedIntoPlayer) {
           effect();
       }
   };

    const togglePlayAudio = (newIsAudioPlaying) => {
        setIsAudioPlaying(newIsAudioPlaying);
        const playerAudio = getPlayerAudio();
        if (newIsAudioPlaying) playerAudio.play();
        else playerAudio.pause();
    };

    const toggleShouldPlay = (shouldPlay) => {
        const effect = () => {
            const newPlayingInfo = {...playingInfo, play: shouldPlay};
            const newIsAudioPlaying = shouldPlay;
            setPlayingInfo(newPlayingInfo);
            togglePlayAudio(newIsAudioPlaying);
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

    const handlePause = () => {
        toggleShouldPlay(false);
    };

    const handlePlay = () => {
        toggleShouldPlay(true);
    };

    const jumpVolume = (direction) => {
        let newVolume = currentVolume;
        switch (direction) {
            case 'up':
                newVolume += volumeIncrement;
                break;
            case 'down':
                newVolume -= volumeIncrement;
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

    const handleKeyPress = useCallback((e) => {
        if (document.activeElement.type !== 'search') {
            const key = e.key.toLowerCase();
            switch (key) {
                case 'm':
                    handleClickVolumeIcon();
                    break;
                case 'k':
                    toggleShouldPlay(!isAudioPlaying);
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
    }, [isMuted, currentVolume, cachedVolume, isAudioPlaying]);

    useEffect(() => {
        const subToKeyPress = () => {
            document.addEventListener('keydown', handleKeyPress);
        };
        const unsubFromKeyPress = () => {
            document.removeEventListener('keydown', handleKeyPress)
        };

        setInitialPlayerAudioVolume();
        subToKeyPress();

        return unsubFromKeyPress();
    }, [handleKeyPress]);

    useEffect(() => {
        togglePlayAudio(play);
    }, [play]);


    const getTrackName = () => {
        const trackName = truncateStr(name, 20, true);
        return trackName;
    };

    const getArtistName = () => {
        const artistName = truncateStr(name, 20, true);
        return artistName;
    };


    return (
        <div className='bottomscreen'>
            <audio id='player-audio' src={currentPreviewURL} type='audio/mp3' onPause={handlePause} onPlay={handlePlay} autoPlay preload='metadata'></audio>
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
                    <i className='bi-arrow-counterclockwise icon' onClick={skipBackwards}></i>
                    {
                    play === true ?
                    <i className='bi-pause icon' onClick={handlePause}></i> :
                    <i className='bi-play icon' onClick={handlePlay}></i>
                    }
                    <i className='bi-arrow-clockwise icon' onClick={skipForwards}></i>
                    <i className='bi-skip-forward icon' onClick={nextTrack}></i>
                    {
                    shouldLoop === true ?
                    <i className='bi-arrow-repeat icon-selected' onClick={toggleLoopTrack}></i> :
                    <i className='bi-arrow-repeat icon' onClick={toggleLoopTrack}></i>
                    }
                </div>
                <CustomPlayer isAudioPlaying={isAudioPlaying}/>
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