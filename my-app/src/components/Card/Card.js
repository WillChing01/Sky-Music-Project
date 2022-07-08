import './Card.css'
import PlayIcon from '../PlayIcon/PlayIcon';
import { useState } from 'react';

const Card = ({ info, previewURL, setPlaying }) => {
    
    return (
        <div className="container border rounded card-view">
            <h5>{info.name}</h5>
            <img src={info.imgSrc} alt={info.name}></img>
            <div className='my-2'>
                <h6>{info.artist}</h6>
                {info.playable && <PlayIcon info={info} previewURL={previewURL} setPlaying={setPlaying} />}
            </div>
        </div> 
    );
};

export default Card;