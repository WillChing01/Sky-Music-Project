import { useSelector } from 'react-redux';
import { getPlaylistTrack } from '../../state/slices/playablePlaylist/playlistMutators';

import Carousel from '../Carousel/Carousel';
import FavouritesIcon from '../FavouritesIcon/FavouritesIcon';

import './TrackInfoSnippet.css';


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
            <div className='img-div'>
                <img className='player-icon' alt='' src={imgSrc}></img>
            </div>
            { name !== '' && <FavouritesIcon trackId={name}/> }
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