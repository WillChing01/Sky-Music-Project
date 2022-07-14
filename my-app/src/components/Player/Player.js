import { useState, useEffect } from 'react';
import CustomPlayer from '../CustomPlayer/CustomPlayer';
import './Player.css';

const Player = ({ playing, setPlaying }) => {
    const { currentPreviewURL , name, artistName, imgSrc, play } = playing;
    const [ volume, setVolume ] = useState(0.2);
    const [ oldVolume, setOldVolume ] = useState(0.2);
    const [ isMuted, setMuted ] = useState(false);
    const [ isRepeat, setRepeat ] = useState(false);
    const [ isShuffle, setShuffle ] = useState(false);

    const [ songProgress, setSongProgress ] = useState(0);
    const [ songDuration, setSongDuration ] = useState(0);

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
        setMuted(!isMuted);
    };

    const handlePause = (e) => {
        setPlaying({...playing, play: false});
    };

    const handlePlay = (e) => {
        setPlaying({...playing, play: true});
    };

    const previousTrack = () => {};

    const nextTrack = () => {};

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

    const updateSongProgress = () => {
        const playerAudio = getPlayerAudio();
        const currentSongTime = playerAudio.currentTime;
        const newSongDuration = playerAudio.duration;
        const newSongProgress = Math.round(100.*(currentSongTime/newSongDuration));

        setSongDuration(newSongDuration);
        setSongProgress(newSongProgress);
    }

    const setTimeUpdate = () => {
        const playerAudio = getPlayerAudio();
        playerAudio.ontimeupdate = function() {updateSongProgress()};
    }

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

    useEffect(() => {
        setInitialVolume();
        setTimeUpdate();
    },[]);

    useEffect(() => {
        togglePlay();
    },[play]);

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
                    {
                    play === true ?
                    <i className='bi-pause icon' onClick={!!name.length ? handlePause : null}></i> :
                    <i className='bi-play icon' onClick={!!name.length ? handlePlay : null}></i>
                    }
                    <i className='bi-skip-forward icon' onClick={nextTrack}></i>
                    {
                    isRepeat === true ?
                    <i className='bi-arrow-repeat icon-selected' onClick={toggleRepeatTracks}></i> :
                    <i className='bi-arrow-repeat icon' onClick={toggleRepeatTracks}></i>
                    }
                </div>
                <CustomPlayer songProgress={songProgress} songDuration={songDuration}/>
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