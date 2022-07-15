import { useState, useEffect, useCallback } from 'react';
import CustomPlayer from '../CustomPlayer/CustomPlayer';
import './Player.css';

const Player = ({ playing, setPlaying }) => {
    const { currentPreviewURL , name, artistName, imgSrc, play } = playing;
    const [ volume, setVolume ] = useState(0.2);
    const [ oldVolume, setOldVolume ] = useState(0.2);
    const [ isMuted, setMuted ] = useState(false);
    const [ isRepeat, setRepeat ] = useState(false);
    const [ isShuffle, setShuffle ] = useState(false);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ volumeIncrement, setVolumeIncrement ] = useState(0.05);
    const [ skipIncrement, setSkipIncrement ] = useState(5);

    const getPlayerAudio = () => {
        return document.getElementById('player-audio');
    };

    const setInitialVolume = () => {
        const playerAudio = getPlayerAudio();
        playerAudio.volume = volume;
    };

    const togglePlay = () => {
        const playerAudio = getPlayerAudio();
        if (play) {
            playerAudio.play();
        }
        else {
            playerAudio.pause();
        }
        setIsPlaying(play);
    };

    const handleVolume = (e) => {
        const playerAudio = getPlayerAudio();
        const newVolume = parseFloat(e.target.value)/100;
        playerAudio.volume = newVolume;
        setVolume(newVolume);
        if (isMuted && volume != 0) {setMuted(false);}
    };

    const toggleVolume = () => {
        const playerAudio = getPlayerAudio();
        if (isMuted) {
            setVolume(oldVolume);
            playerAudio.volume = oldVolume;
        }
        else {
            setOldVolume(volume);
            setVolume(0);
            playerAudio.volume = 0;
        }
        const newMute = !isMuted;
        setMuted(newMute);
    };

    const increaseVolume = () => {
        const newVolume = volume + volumeIncrement;
    }

    const decreaseVolume = () => {
        const newVolume = volume - volumeIncrement;
    }

    const handlePause = (e) => {
        setPlaying({...playing, play: false});
        setIsPlaying(false);
    };

    const handlePlay = (e) => {
        setPlaying({...playing, play: true});
        setIsPlaying(true);
    };

    const previousTrack = () => {
        if (!!!name.length) {return;}
        const playerAudio = getPlayerAudio();
        playerAudio.currentTime = 0;
    };

    const nextTrack = () => {
        if (!!!name.length) {return;}
        const playerAudio = getPlayerAudio();
        const tinyAmount = 0.000001;
        playerAudio.currentTime = playerAudio.duration - tinyAmount;
    };

    const skipForwards = () => {
        if (!!!name.length) {return;}
        const playerAudio = getPlayerAudio();
        const tinyAmount = 0.000001;
        playerAudio.currentTime = Math.min(playerAudio.currentTime + skipIncrement,
                                  playerAudio.duration + tinyAmount);
    }

    const skipBackwards = () => {
        if (!!!name.length) {return;}
        const playerAudio = getPlayerAudio();
        playerAudio.currentTime = Math.max(playerAudio.currentTime - skipIncrement, 0);
    }

    const toggleShuffleTracks = () => {
        const newShuffle=!isShuffle;
        setShuffle(newShuffle);
    };

    const toggleRepeatTracks = () => {
        const playerAudio = getPlayerAudio();
        const newRepeat=!isRepeat;
        setRepeat(newRepeat);
        playerAudio.loop=newRepeat;
    };

    const formatString = (str) => {
        /*
            if str is longer than charLimit, will return the first
            {charLimit} characters and then three dots '...'
            so song title/artist doesn't eclipse play buttons etc.
        */
        const charLimit = 20;
        let formattedString = '';
        
        if (str.length <= charLimit) {
            formattedString = str;
        }
        else {
            formattedString = str.slice(0,charLimit);
            formattedString += '...';
        }

        return formattedString;
    }

    const handleKeyPress = useCallback((e) => {
        if (document.activeElement.type === 'search') {return;}
        if (e.key.toLowerCase() === 'm') {
            //mute.
            toggleVolume();
        }
        else if (e.key.toLowerCase() === 'k' && !!name.length) {
            //toggle play.
            if (isPlaying) {handlePause();}
            else {handlePlay();}
        }
        else if (e.key.toLowerCase() === 'j' && !!name.length) {
            //go to beginning of track.
            previousTrack();
        }
        else if (e.key.toLowerCase() === 'l' && !!name.length) {
            //go to end of track.
            nextTrack();
        }
        else if (e.key === ']') {
            //increase the volume.
            increaseVolume();
        }
        else if (e.key === '[') {
            //decrease the volume.
            decreaseVolume();
        }
        else if (e.key === 'ArrowLeft' && !!name.length) {
            //go back 5 seconds.
            skipBackwards();
        }
        else if (e.key === 'ArrowRight' && !!name.length) {
            //go forward 5 seconds.
            skipForwards();
        }
    },[ isMuted, volume, oldVolume, isPlaying, volumeIncrement, skipIncrement ]);

    useEffect(() => {
        setInitialVolume();

        //add keyboard input.
        document.addEventListener('keydown',handleKeyPress);

        return () => {document.removeEventListener('keydown',handleKeyPress)};
    },[ handleKeyPress ]);

    useEffect(() => {
        togglePlay();
    },[ play ]);

    return (
        <div className='bottomscreen'>
            <audio id='player-audio' src={currentPreviewURL} type='audio/mp3' onPause={handlePause} onPlay={handlePlay} autoPlay preload='metadata'></audio>
            <img id='player-icon' src={imgSrc}></img>
            <ul className='no-bullets'>
                <li>
                    <span className='make-bold'>{!!name.length ? formatString(name) : ''}</span>
                </li>
                <li>
                    <span>{!!artistName.length ? formatString(artistName) : ''}</span>
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
                    <i className='bi-pause icon' onClick={!!name.length ? handlePause : null}></i> :
                    <i className='bi-play icon' onClick={!!name.length ? handlePlay : null}></i>
                    }
                    <i className='bi-arrow-clockwise icon' onClick={skipForwards}></i>
                    <i className='bi-skip-forward icon' onClick={nextTrack}></i>
                    {
                    isRepeat === true ?
                    <i className='bi-arrow-repeat icon-selected' onClick={toggleRepeatTracks}></i> :
                    <i className='bi-arrow-repeat icon' onClick={toggleRepeatTracks}></i>
                    }
                </div>
                <CustomPlayer isPlaying={isPlaying}/>
            </div>
            <span className='region'/>
            {
            volume === 0 ?
            <i className='bi-volume-mute icon' onClick={toggleVolume}></i> :
            <i className='bi-volume-up icon' onClick={toggleVolume}></i>
            }
            <input type='range' min='0' max='100' value={volume*100} onChange={handleVolume}/>
        </div>
    );
}

export default Player;