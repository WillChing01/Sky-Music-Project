import { useEffect, useRef, useState } from 'react';
import './Carousel.css';

const Carousel = ({ text, className = '' }) => {
    const ref = useRef();
    const [overflow, setOverflow] = useState(false);

    useEffect(() => {
        const textRef = ref.current;
        const overflowBoxRef = textRef.parentElement.parentElement;
        const textWidth = textRef.offsetWidth;
        const overflowBoxWidth = overflowBoxRef.offsetWidth;

        if (textWidth > overflowBoxWidth) setOverflow(true);
        else setOverflow(false);
    }, [ref, text]);

    const getOverflowBoxClass = () => {
        const overflowBoxClass = overflow ? 'overflow-box overflow' : 'overflow-box'
        return overflowBoxClass;
    }

    const getScrollingBoxClass = () => {
        const scrollingBoxClass = overflow ? 'scrolling-box' : '';
        return scrollingBoxClass;
    }

    return (
        <div className={getOverflowBoxClass()}>
            <div className={getScrollingBoxClass()}>
                <span ref={ref} className={`left-side ${className}`}>{text}</span>
                <span className={`right-side ${className}`}>{text}</span>
            </div>
        </div>
    );
}
 
export default Carousel;