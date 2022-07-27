import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTrack } from '../../state/slices/playablePlaylist/playablePlaylistSlice';
import { setIsPlaying } from '../../state/slices/playerConfig/playerConfigSlice';

import "./PlayIcon.css";

const playIconClass = 'bi-play-fill';
const pauseIconClass = 'bi-pause';

const PlayIcon = ({itemInfo}) => { 
    const [iconClass, setIconClass] = useState(playIconClass);

    //const {isPlaying, currentPreviewURL} = useSelector((state) => state.playerInfo);
    const isPlaying = useSelector((state) => state.playerConfig.isPlaying)
    const { currentPreviewURL } = useSelector((state) => state.playablePlaylist.currentPlaylist.playingTrack);
    
    const dispatch = useDispatch();

    const configureIcons = useCallback(() => {
        const isCurrentTrack = itemInfo.previewURL === currentPreviewURL;
        if (isCurrentTrack && isPlaying) setIconClass(pauseIconClass)
        else setIconClass(playIconClass)
    }, [currentPreviewURL, isPlaying, itemInfo.previewURL]);   

    const getIconClassName = () => {
        const isPlaying = itemInfo.previewURL === currentPreviewURL;
        if (isPlaying) return `bi display ${iconClass}`;
        else return `bi ${iconClass}`; 
    };

    const handleClick = () => {
        const { id, previewURL, name, artist, imgSrc } = itemInfo;
        const isCurrentTrack = itemInfo.previewURL === currentPreviewURL;
        const newIsPlaying = isCurrentTrack ? !isPlaying : true;
        const newTrack = {
            id,
            currentPreviewURL: previewURL,
            name,
            artistName: artist,
            imgSrc,
        };
        dispatch(setTrack(newTrack));
        dispatch(setIsPlaying(newIsPlaying));
    };

    useEffect(() => {
        configureIcons();
    }, [configureIcons]);

    return (
        <i className={getIconClassName()} onClick={handleClick}></i>
    );
}
 
export default PlayIcon;