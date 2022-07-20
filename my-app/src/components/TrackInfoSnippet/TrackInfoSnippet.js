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

    return(
        <>
            <div className='img-div'><img id='player-icon' alt='' src={imgSrc}></img></div>
            <ul className='no-bullets'>
                <li>
                    <div className='test-thing'><span className='make-bold fixed-width'>{getTrackName()}</span></div>
                </li>
                <li>
                    <div className='test-thing'><span className='fixed-width'>{getArtistName()}</span></div>
                </li>
            </ul>
        </>
    );
}

export default TrackInfoSnippet;