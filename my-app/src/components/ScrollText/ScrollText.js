import { useEffect, useState } from 'react';

import './ScrollText.css';

const scrollSpeed = 0.3;

const ScrollText = ({ message, containerId }) => {

    const scrollingId = 'scrolling-' + containerId;
    const scrollingSpanId = 'scrolling-' + containerId + '-span';

    const [ transitionTime, setTransitionTime ] = useState(0);

    const getRoot = () => {
        return getComputedStyle(document.body);
    };

    const getScrollBar = () => {
        return document.getElementById(scrollingId);
    };

    const getScrollBarSpan = () => {
        return document.getElementById(scrollingSpanId);
    };

    const getScrollBarWidth = () => {
        const scrollBar = document.getElementById(scrollingId);
        return scrollBar.clientWidth;
    };

    const getScrollBarSpanWidth = () => {
        const scrollBarSpan = document.getElementById(scrollingSpanId);
        const style = getComputedStyle(scrollBarSpan);
        const scrollBarSpanWidth = parseFloat(style.width);
        return scrollBarSpanWidth;
    }
    
    const getShadowWidthFraction = () => {
        const root = getRoot();
        return root.getPropertyValue('--shadow-width');
    }

    useEffect(() => {
        const getTransitionDistance = () => {
            const scrollWidth = getScrollBarWidth();
            const elementWidth = getScrollBarSpanWidth();
            const shadowWidthFraction = getShadowWidthFraction();
            const shadowWidth = shadowWidthFraction * scrollWidth;
            
            const transitionDistance = elementWidth + 2 * shadowWidth - scrollWidth;

            return transitionDistance;
        }

        const setScrollTime = () => {
            const element = document.getElementById(scrollingSpanId);
            
            const scrollWidth = getScrollBarWidth();
            const transitionDistance = getTransitionDistance();
            const transitionFraction = Math.max(0, transitionDistance / scrollWidth);
            
            const newTime = String(transitionFraction / scrollSpeed);
            element.style.transitionDuration = newTime + 's';
            setTransitionTime(newTime);
        };

        setScrollTime();
        
    }, [message]);

    useEffect(() => {
        let isForward = false;

        const changeTransform = (argument) => {
            const scrollBarSpan = getScrollBarSpan();
            scrollBarSpan.style.transform = argument;
        };

        const forwardAnimation = (e) => {
            //change the translateX to length.
            const scrollWidth = String(getScrollBarWidth()) + 'px';
            changeTransform('translateX(min(calc(var(--shadow-width) * ' + scrollWidth + '), calc((1 - var(--shadow-width)) * ' + scrollWidth + ' - 100%)))');
        };
        
        const backwardAnimation = (e) => {
            //revert the translateX to original.
            const scrollWidth = String(getScrollBarWidth()) + 'px';
            changeTransform('translateX(calc(var(--shadow-width) * ' + scrollWidth + '))');
        };

        const toggleDirection = () => {
            if (isForward) {
                backwardAnimation();
            }
            else {
                forwardAnimation();
            }
            isForward = !isForward;
        }

        backwardAnimation();

        const timing = 1000 * transitionTime + 1000;
        const scrollInterval = setInterval(() => {toggleDirection();}, timing);

        return () => {
            clearInterval(scrollInterval);
        };

    }, [transitionTime]);

    return(
        <div className='shadow-wrapper'>
            <div id={scrollingId} className='scroll-box'>
                <span id={scrollingSpanId}>{message}</span>
            </div>
        </div>
    );
}

export default ScrollText;

// import './ScrollText.css';

// const ScrollText = ({ text }) => {
//     return (
//         <div className='fit-parent'>
//             <div className='scrolling-text'>
//                 <span className='left-side'>{text}</span>
//                 <span className='right-side'>{text}</span>
//             </div>
//         </div>
//     );
// }
 
// export default ScrollText;

// .fit-parent {
//     overflow: hidden;
//     white-space: nowrap;
// }

// .scrolling-text {
//     animation: scroll 8s linear infinite;
// }

// .left-side {
//     position: absolute;
//     float: left;
// }

// .right-side {
//     float: right;
//     transform: translateX(100%);
// }

// @keyframes scroll {
//     0% {
//         transform: translateX(0%);
//     }

//     100% {
//         transform: translateX(-100%);
//     }
// }