import { useSelector } from 'react-redux';
import { useAuthContext } from '../../hooks/useAuthContext';

import Carousel from '../Carousel/Carousel';
import FavouritesIcon from '../FavouritesIcon/FavouritesIcon';

import './TrackInfoSnippet.css';


const TrackInfoSnippet = () => {
    const { user } = useAuthContext();

    const {
        id,
        name,
        artistName,
        imgSrc
    } = useSelector((state) => state.playablePlaylist.currentPlaylist.playingTrack);

    return(
        <>
            <div className='img-div'>
                <img className='player-icon' alt='' src={imgSrc}></img>
            </div>
            { id !== '' && user && <FavouritesIcon trackId={id} prefix="player"/> }
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