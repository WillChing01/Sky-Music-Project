import { useState, useEffect } from "react";
import './Player.css';

const Player = ({ playing }) => {
    const { previewURL, name, artistName, imgSrc, play } = playing;
    const[volume,setVolume]=useState(0.2);

    useEffect(() => {
        const player = document.getElementById('player');
        if(play) player.play();
        else player.pause()
    },[play]);

    return (
        <div className='bottomscreen'>
            <div>
                {!!name.length ? name+', '+artistName: 'N/A'}
            </div>
            <input type='range' min='0' max='100'/>
            <audio id='player' src={previewURL} type='audio/mp3' autoPlay controls>
            </audio>
            <img src={imgSrc} width={'10%'} height='auto'></img>
        </div>
    );
}

export default Player;