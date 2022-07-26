import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ScrollText from '../ScrollText/ScrollText';
import Carousel from '../Carousel/Carousel';

import './TrackInfoSnippet.css';
import { getPlaylistTrack } from '../../state/slices/playablePlaylist/playlistMutators';

const scrollSpeed = 0.5;

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
            <div className='info-div'>
                <div className='make-bold'>
                    {/* <ScrollText message={name} containerId={'asdf'} /> */}
                    <Carousel text={name} />
                </div>
                {/* <ScrollText message={artistName} containerId={'asdlfjef'} /> */}
                <Carousel text={artistName} />
            </div>
        </>
    );
}

export default TrackInfoSnippet;