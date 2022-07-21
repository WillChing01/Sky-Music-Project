import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { truncateStr } from '../../utility/format/formatStr';

import './TrackInfoSnippet.css';

const charLimit = 20;
const scrollSpeed = 0.5;

const TrackInfoSnippet = () => {
    const {
        name, 
        artistName, 
        imgSrc 
    } = useSelector((state) => state.playerInfo);

    /* 
    const getTrackName = () => {
        const truncatedTrackName = truncateStr(name, charLimit, true);
        return truncatedTrackName;
    };

    const getArtistName = () => {
        const truncatedArtistName = truncateStr(artistName, charLimit, true);
        return truncatedArtistName;
    };
    */

    const getScrollBarWidth = () => {
        const scrollBar = document.getElementById('scrolling');
        return scrollBar.clientWidth;
    }

    const handleWindowResize = (e) => {
        const root = document.documentElement;
        const scrollWidth = getScrollBarWidth();
        root.style.setProperty('--scroll-bar-width', scrollWidth+'px');
    };

    useEffect(() => {
        //initial resize.
        handleWindowResize();

        //check for window resize.
        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    useEffect(() => {
        const setScrollTime = (elementID) => {
            const element = document.getElementById(elementID);
            const style = getComputedStyle(element);
            const scrollWidth = getScrollBarWidth();
            const elementWidth = parseFloat(style.width);
            const transitionFraction = Math.max(0, (elementWidth - scrollWidth) / scrollWidth);
            const newTime = String(transitionFraction / scrollSpeed) + 's';
            element.style.transitionDuration = newTime;
        }

        setScrollTime('scroll-name');
        setScrollTime('scroll-artist');
    }, [name, artistName]);

    return(
        <>
            <div className='img-div'><img id='player-icon' alt='' src={imgSrc}></img></div>
            <div className='info-div'>
                <div className='shadow-wrapper'>
                    <div id='scrolling' className='scroll-box'>
                        <span id='scroll-name' className='make-bold'>{name}</span>
                    </div>
                </div>
                <div className='shadow-wrapper'>
                    <div className='scroll-box'>
                        <span id='scroll-artist'>{artistName}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TrackInfoSnippet;