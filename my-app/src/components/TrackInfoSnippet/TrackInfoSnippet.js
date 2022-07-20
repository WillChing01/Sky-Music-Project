import { useSelector } from 'react-redux';
import { truncateStr } from '../../utility/format/formatStr';

const charLimit = 20;

const TrackInfoSnippet = () => {

    const { name, artistName, imgSrc } = useSelector((state) => state.playerInfo);

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
            <img id='player-icon' alt='' src={imgSrc}></img>
            <ul className='no-bullets'>
                <li>
                    <span className='make-bold'>{getTrackName()}</span>
                </li>
                <li>
                    <span>{getArtistName()}</span>
                </li>
            </ul>
        </>
    );
}

export default TrackInfoSnippet;