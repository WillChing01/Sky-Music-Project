import { useEffect, useState } from 'react';

import "./PlayIcon.css";

const playIconClass = 'bi-play-fill';
const pauseIconClass = 'bi-pause';
const iconClasses = [playIconClass, pauseIconClass]; 

const PlayIcon = ({itemInfo, currentPreviewURL, play, setPlayingInfo}) => { 
    const [iconClass, setIconClass] = useState(playIconClass);

    useEffect(() => {
        const isCurrentTrack = itemInfo.previewURL === currentPreviewURL;
        if (isCurrentTrack) {
            if (play) setIconClass(pauseIconClass);
            else setIconClass(playIconClass);
        } else {
            setIconClass(playIconClass);
        }
    }, [currentPreviewURL, play]);   

    const getIconClassName = () => {
        const isPlaying = itemInfo.previewURL === currentPreviewURL;
        if (isPlaying) return `bi display ${iconClass}`;
        else return `bi ${iconClass}`; 
    };

    const getNewIconClass = () => {
        const newIconClassIndex = (iconClasses.indexOf(iconClass) + 1) % 2;
        const newIconClass = iconClasses[newIconClassIndex];
        return newIconClass;
    };

    const toggleIcons = () => {      
        const newIconClass = getNewIconClass();
        setIconClass(newIconClass);
    };

    const handleClick = () => {
        const { previewURL, name, artist, imgSrc } = itemInfo;
        const play = iconClass === playIconClass; 
        const newPlayingInfo = {
            currentPreviewURL: previewURL,
            name,
            artistName: artist,
            imgSrc,
            play
        };
        setPlayingInfo(newPlayingInfo);
        toggleIcons();
    };

    return (
        <i className={getIconClassName()} onClick={handleClick}></i>
    );
}
 
export default PlayIcon;