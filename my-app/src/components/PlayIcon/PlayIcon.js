import { useEffect, useState } from 'react';
import "./PlayIcon.css";


const PlayIcon = ({info, currentPreviewURL, setPlaying}) => {
    const [icon, setIcon] = useState('bi-play-fill');

    useEffect(() => {
        const needsReset = getNeedsReset(); 
        if (needsReset) {
            setIcon('bi-play-fill');
        }
    }, [currentPreviewURL]);

    const getNeedsReset = () => {
        const isNotPlaying = info.previewURL !== currentPreviewURL
        const iconIsPause = icon === 'bi-pause';
        const needsReset = isNotPlaying && iconIsPause;
        return needsReset;
    };    

    const getIconClass = () => {
        const isPlaying = info.previewURL === currentPreviewURL;
        if (isPlaying) return `bi display ${icon}`;
        else return `bi ${icon}`; 
    };

    const getNewIcon = () => {
        const icons = ['bi-play-fill', 'bi-pause'];
        const newIcon = icons[(icons.indexOf(icon) + 1) % 2];
        return newIcon;
    };

    const toggleIcons = () => {      
        const newIcon = getNewIcon();
        setIcon(newIcon);
    };

    const handleClick = (currentPreviewURL, name, artistName, imgSrc) => {
        const play = icon === "bi-play-fill"; 
        toggleIcons();
        setPlaying({currentPreviewURL, name, artistName, imgSrc, play});
    };

    return (
        <i className={getIconClass()} onClick={e => handleClick(info.previewURL, info.name, info.artist, info.imgSrc)}></i>
    );
}
 
export default PlayIcon;