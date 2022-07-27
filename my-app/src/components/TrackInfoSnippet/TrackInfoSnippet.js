import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ScrollText from '../ScrollText/ScrollText';
import Carousel from '../Carousel/Carousel';
import FavouritesIcon from '../FavouritesIcon/FavouritesIcon';

import './TrackInfoSnippet.css';
import { getPlaylistTrack } from '../../state/slices/playablePlaylist/playlistMutators';

const TrackInfoSnippet = () => {
    const {
        name,
        artistName,
        imgSrc
    } = useSelector((state) => {
        const playlist = state.playablePlaylist.currentPlaylist;
        return getPlaylistTrack(playlist);
    });

    return(
        <>
            <div className='img-div'><img id='player-icon' alt='' src={imgSrc}></img></div>
            {/* { name !== '' && <FavouritesIcon trackId={name}/>} */}
            <div className='info-div'>
                <div className='make-bold'>
                    <Carousel text={name} />
                </div>
                <Carousel text={artistName} />
                
            </div>
        </>
    );
}

export default TrackInfoSnippet;