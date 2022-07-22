import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ScrollText from '../ScrollText/ScrollText';

import './TrackInfoSnippet.css';

const scrollSpeed = 0.5;

const TrackInfoSnippet = () => {
    const {
        name,
        artistName,
        imgSrc
    } = useSelector((state) => state.playerInfo);

    /*
    const getRoot = () => {
        const root = document.documentElement;
        return root;
    }

    const getScrollBarWidth = () => {
        const scrollBar = document.getElementById('scrolling');
        return scrollBar.clientWidth;
    }

    useEffect(() => {
        const handleWindowResize = (e) => {
            const root = getRoot();
            const scrollWidth = getScrollBarWidth();
            root.style.setProperty('--scroll-bar-width', scrollWidth+'px');
        };

        //initial resize.
        handleWindowResize();

        //check for window resize.
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    }, []);

    useEffect(() => {
        const setScrollTime = (elementID) => {
            const rootStyle = getComputedStyle(document.body);
            const element = document.getElementById(elementID);
            const style = getComputedStyle(element);

            const scrollWidth = getScrollBarWidth();
            const elementWidth = parseFloat(style.width);
            const shadowWidth = rootStyle.getPropertyValue('--shadow-width') * scrollWidth;
            
            const transitionDistance = elementWidth + 2 * shadowWidth - scrollWidth;

            const transitionFraction = Math.max(0, transitionDistance / scrollWidth);
            const newTime = String(transitionFraction / scrollSpeed) + 's';
            
            element.style.transitionDuration = newTime;
            console.log(transitionFraction, elementWidth, scrollWidth);
            console.log(newTime);
        }

        setScrollTime('scroll-name');
        setScrollTime('scroll-artist');
    }, [name, artistName]);
    */
    

    return(
        <>
            <div className='img-div'><img id='player-icon' alt='' src={imgSrc}></img></div>
            <div className='info-div'>
                <ScrollText message={name} containerId={'info-div'}/>
                <ScrollText message={artistName} containerId={'info-div'}/>
                {/*<div className='shadow-wrapper make-bold'>
                    <div id='scrolling' className='scroll-box'>
                        <span id='scroll-name'>{name}</span>
                    </div>
                </div>
                <div className='shadow-wrapper'>
                    <div className='scroll-box'>
                        <span id='scroll-artist'>{artistName}</span>
                    </div>
    </div>*/}
            </div>
        </>
    );
}

export default TrackInfoSnippet;