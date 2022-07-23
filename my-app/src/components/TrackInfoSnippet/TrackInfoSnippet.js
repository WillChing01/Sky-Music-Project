import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ScrollText from '../ScrollText/ScrollText';
import Carousel from '../Carousel/Carousel';

import './TrackInfoSnippet.css';

const scrollSpeed = 0.5;

const TrackInfoSnippet = () => {
    const {
        name,
        artistName,
        imgSrc
    } = useSelector((state) => state.playerInfo);

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