import { useState } from 'react';
import PlayIcon from '../PlayIcon/PlayIcon';
import './Card.css'

const Card = ({ info, currentPreviewURL, setPlaying }) => {
    
    return (
        <div className='py-2 px-4 m-4 border rounded card-view'>
            <h5>{info.name}</h5>
            <img src={info.imgSrc} alt={info.name}></img>
            <div className='mt-2'>
                <h6>{info.artist}</h6>
                {info.playable && <PlayIcon info={info} currentPreviewURL={currentPreviewURL} setPlaying={setPlaying} />}
            </div>
        </div> 
    );
};

export default Card;