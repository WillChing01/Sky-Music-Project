import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerInfo } from '../../state/slices/playerInfoSlice';

import "./PlayIcon.css";

const playIconClass = 'bi-play-fill';
const pauseIconClass = 'bi-pause';

const PlayIcon = ({itemInfo}) => { 
    const [iconClass, setIconClass] = useState(playIconClass);

    const {isPlaying, currentPreviewURL} = useSelector((state) => state.playerInfo);
    const dispatch = useDispatch();

    const configureIcons = () => {
        const isCurrentTrack = itemInfo.previewURL === currentPreviewURL;
        if (isCurrentTrack && isPlaying) setIconClass(pauseIconClass)
        else setIconClass(playIconClass)
    };   

    const getIconClassName = () => {
        const isPlaying = itemInfo.previewURL === currentPreviewURL;
        if (isPlaying) return `bi display ${iconClass}`;
        else return `bi ${iconClass}`; 
    };

    const handleClick = () => {
        const { previewURL, name, artist, imgSrc } = itemInfo;
        const isCurrentTrack = itemInfo.previewURL === currentPreviewURL;
        const newIsPlaying = isCurrentTrack ? !isPlaying : true;
        const newPlayingInfo = {
            currentPreviewURL: previewURL,
            name,
            artistName: artist,
            imgSrc,
            isPlaying: newIsPlaying
        };

        dispatch(setPlayerInfo(newPlayingInfo));
    };

    useEffect(() => {
        configureIcons();
    }, [currentPreviewURL, isPlaying]);

    return (
        <i className={getIconClassName()} onClick={handleClick}></i>
    );
}
 
export default PlayIcon;