import { useState, useEffect } from "react";
import './Player.css';

const Player = ({ playing }) => {
    const { currentPreviewURL , name, artistName, imgSrc, play } = playing;
    const [ volume, setVolume ] = useState(0.2);

    console.log("current track is ", currentPreviewURL, " and it's playing? ", `${play ? "yes": "nope"}`)

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
    };

    const previousTrack = () => {};

    const nextTrack = () => {};

    useEffect(() => {
        setInitialVolume();
    },[]);

    useEffect(() => {
        togglePlay();
    },[play]);
    

    return (
        <div className='bottomscreen'>
            <img id='player-icon' src={imgSrc}></img>
            <span>{!!name.length ? name+', '+artistName: 'N/A'}</span>
            <span className='region'/>
            {/* <i className='bi-skip-backward' onClick={previousTrack}></i>
            <i className='bi-skip-forward' onClick={nextTrack}></i> */}
            <audio id='player-audio' src={currentPreviewURL } type='audio/mp3' autoPlay controls></audio>
            <span className='region'/>
            <input type='range' min='0' max='100' value={volume*100} onChange={handleVolume}/>
        </div>
    );
}

export default Player;