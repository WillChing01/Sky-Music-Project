import { useEffect } from 'react';

import './ScrollText.css';

const scrollSpeed = 0.5;

const ScrollText = ({ message, containerId }) => {

    const scrollingId = 'scrolling-'+containerId;
    const scrollingSpanId = 'scrolling-' + containerId + '-span';

    const getRoot = () => {
        return document.documentElement;
    }

    const getScrollBar = () => {
        return document.getElementById(scrollingId);
    }

    const getScrollBarSpan = () => {
        return document.getElementById(scrollingSpanId);
    }

    const getScrollBarWidth = () => {
        const scrollBar = document.getElementById(scrollingId);
        return scrollBar.clientWidth;
    }

    useEffect(() => {
        const changeTransform = (argument) => {
            const scrollBarSpan = getScrollBarSpan();
            scrollBarSpan.style.transform = argument;
        }

        const handleMouseEnter = (e) => {
            //change the translateX to length.
            const scrollWidth = String(getScrollBarWidth()) + 'px';
            changeTransform('translateX(min(calc(var(--shadow-width) * ' + scrollWidth + '), calc((1 - var(--shadow-width)) * ' + scrollWidth + ' - 100%)))');
        }
        
        const handleMouseLeave = (e) => {
            //revert the translateX to original.
            const scrollWidth = String(getScrollBarWidth()) + 'px';
            changeTransform('translateX(calc(var(--shadow-width) * ' + scrollWidth + '))');
        }

        const scrollBar = getScrollBar();
        scrollBar.addEventListener('mouseenter', handleMouseEnter);
        scrollBar.addEventListener('mouseleave', handleMouseLeave);

        handleMouseLeave();

        return () => {
            scrollBar.removeEventListener('mouseenter', handleMouseEnter);
            scrollBar.removeEventListener('mouseleave', handleMouseLeave);
        };

    }, []);

    useEffect(() => {
        const setScrollTime = (elementID) => {
            const root = getComputedStyle(document.body);
            const element = document.getElementById(elementID);
            const style = getComputedStyle(element);

            const scrollWidth = getScrollBarWidth();
            const elementWidth = parseFloat(style.width);
            const shadowWidth = root.getPropertyValue('--shadow-width') * scrollWidth;
            
            const transitionDistance = elementWidth + 2 * shadowWidth - scrollWidth;

            const transitionFraction = Math.max(0, transitionDistance / scrollWidth);
            const newTime = String(transitionFraction / scrollSpeed) + 's';
            
            element.style.transitionDuration = newTime;
            console.log(transitionFraction, elementWidth, scrollWidth);
            console.log(newTime);
        }

        setScrollTime(scrollingSpanId);
    }, [message]);

    return(
        <div className='shadow-wrapper'>
            <div id={scrollingId} className='scroll-box'>
                <span id={scrollingSpanId}>{message}</span>
            </div>
        </div>
    );
}

export default ScrollText;