import FlipWrap from '../FlipWrap/FlipWrap';

import './WrapArtist.css'

const WrapArtist = ({children}) => {

    return (
        <div className='wrapped-artist m-4'>
            <FlipWrap front={children} back={children}/>
        </div>
    );
};
 
export default WrapArtist;