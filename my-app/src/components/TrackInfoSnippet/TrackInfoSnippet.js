import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { truncateStr } from '../../utility/format/formatStr';

import './TrackInfoSnippet.css';

const charLimit = 20;

const TrackInfoSnippet = () => {
    const {
        name, 
        artistName, 
        imgSrc 
    } = useSelector((state) => state.playerInfo);

    const getTrackName = () => {
        const truncatedTrackName = truncateStr(name, charLimit, true);
        return truncatedTrackName;
    };

    const getArtistName = () => {
        const truncatedArtistName = truncateStr(artistName, charLimit, true);
        return truncatedArtistName;
    };

    const handleWindowResize = (e) => {
        console.log('resizing!');
        const root = document.documentElement;
        const scrollBar = document.getElementById('scrolling');
        root.style.setProperty('--scroll-bar-width', scrollBar.clientWidth+'px');
    };

    useEffect(() => {
        //initial resize.
        handleWindowResize();

        //check for window resize.
        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return(
        <>
            <div className='img-div'><img id='player-icon' alt='' src={imgSrc}></img></div>
            <div className='info-div'>
                <div id='scrolling' className='scroll-box'><span className='make-bold'>asldfjwoeifjsldfkjsdofijwef</span></div>
                <div className='scroll-box'><span>sdfjiwoeifnoweifnwefoisdioowiefjoweijf</span></div>
            </div>
        </>
    );
}

export default TrackInfoSnippet;