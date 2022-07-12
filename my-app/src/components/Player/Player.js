import { useState, useEffect } from "react";
import './Player.css';

const Player = ({ playing, setPlaying }) => {
    const { currentPreviewURL , name, artistName, imgSrc, play } = playing;
    const [ volume, setVolume ] = useState(0.2);
    const [ oldVolume, setOldVolume ] = useState(0.2);
    const [ isMuted, setMuted ] = useState(false);
    const [ isRepeat, setRepeat ] = useState(false);
    const [ isShuffle, setShuffle ] = useState(false);
    const [ nextSelected, setNextSelected ] = useState(false);
    const [ previousSelected, setPreviousSelected ] = useState(false);

    const getPlayerAudio = () => {
        return document.getElementById('player-audio');
    };

    const setInitialVolume = () => {
        const playerAudio = getPlayerAudio();
        playerAudio.volume = volume;
    };

    const togglePlay = () => {
        const playerAudio = getPlayerAudio(); 
        if (play) playerAudio.play();
        else playerAudio.pause();
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

    useEffect(() => {
        setInitialVolume();
    },[]);

    useEffect(() => {
        togglePlay();
    },[play]);

    return (
        <div className='bottomscreen'>
            <img id='player-icon' src={imgSrc}></img>
            <ul className='no-bullets'>
            <li><span className='make-bold'>{!!name.length ? name : ''}</span></li>
            <li><span>{!!artistName.length ? artistName : ''}</span></li>
            </ul>
            <div className='center-position'>
                <div className='spread'>
                    {
                    isShuffle ?
                    <i className='bi-shuffle icon-selected' onClick={toggleShuffleTracks}></i> :
                    <i className='bi-shuffle icon' onClick={toggleShuffleTracks}></i>
                    }
                    <i className='bi-skip-backward icon' onClick={previousTrack}></i>
                    <i className='bi-play icon'></i>
                    <i className='bi-skip-forward icon' onClick={nextTrack}></i>
                    {
                    isRepeat ?
                    <i className='bi-arrow-repeat icon-selected' onClick={toggleRepeatTracks}></i> :
                    <i className='bi-arrow-repeat icon' onClick={toggleRepeatTracks}></i>
                    }
                </div>
                <div className='center-elements'>
                <audio id='player-audio' src={currentPreviewURL} type='audio/mp3' onPause={handlePause} onPlay={handlePlay} autoPlay controls></audio>
                </div>
            </div>
            <span className='region'/>
            {
            volume === 0 ?
            <i className='bi-volume-mute icon' onClick={toggleVolume}></i> :
            (volume < 0.5 ?
            <i className='bi-volume-down icon' onClick={toggleVolume}></i> :
            <i className='bi-volume-up icon' onClick={toggleVolume}></i>)
            }
            <input type='range' min='0' max='100' value={volume*100} onChange={handleVolume}/>
        </div>
    );
}

export default Player;