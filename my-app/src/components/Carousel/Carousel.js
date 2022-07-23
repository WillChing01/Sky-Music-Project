import { useEffect, useState, useRef } from 'react';
import './Carousel.css';

const Carousel = ({ text }) => {
    const ref = useRef();
    const [overflow, setOverflow] = useState(false);

    useEffect(() => {
        const content = ref.current;
        const contentWidth = content.offsetWidth;
        const parentWidth = content.parentElement.offsetWidth; 

        if (contentWidth > parentWidth) setOverflow(true);
        else setOverflow(false);
    }, [ref.current]);

    return (
        <div className={`hide-content ${overflow ? 'overflow' : ''}`}>
            <div className={overflow ? 'scrolling-text' : ''}>
                <span ref={ref} className='left-side'>{text}</span>
                <span className='right-side'>{text}</span>
            </div>
        </div>
    );
}
 
export default Carousel;