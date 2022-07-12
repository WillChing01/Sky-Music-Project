import { useState } from 'react';
import { fetchAlbumTracks } from '../../utility/fetchNapster';
import PlayIcon from '../PlayIcon/PlayIcon';
import './Card.css'

const Card = ({ info, currentPreviewURL, play, setPlaying }) => {
    // logic also needed for list
    const handleClick = async () => {
        if (info.type === 'album') {
            const { newData: albumTracks } = await fetchAlbumTracks(info.id, 1);
        }
    };
    


    return (
        <div className='py-2 px-4 m-4 border rounded card-view' onClick={handleClick}>
            <h5>{info.name}</h5>
            <img src={info.imgSrc} alt={info.name}></img>
            <div className='mt-2'>
                <h6>{info.artist}</h6>
                {info.playable && <PlayIcon info={info} currentPreviewURL={currentPreviewURL} play={play} setPlaying={setPlaying} />}
            </div>
        </div> 
    );
};

export default Card;