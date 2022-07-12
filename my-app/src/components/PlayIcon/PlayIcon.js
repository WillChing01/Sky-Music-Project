import { useEffect, useState } from 'react';
import "./PlayIcon.css";


const PlayIcon = ({info, currentPreviewURL, play, setPlaying}) => {
    const [playIcon, pauseIcon] = ['bi-play-fill', 'bi-pause']
    const [icon, setIcon] = useState(playIcon);

    useEffect(() => {
        const currentTrack = info.previewURL === currentPreviewURL;
        if(currentTrack) play ? setIcon(pauseIcon) : setIcon(playIcon);
        else setIcon(playIcon);
    }, [currentPreviewURL, play]);   

    const getIconClass = () => {
        const isPlaying = info.previewURL === currentPreviewURL;
        if (isPlaying) return `bi display ${icon}`;
        else return `bi ${icon}`; 
    };

    const getNewIcon = () => {
        const icons = [playIcon, pauseIcon];
        const newIcon = icons[(icons.indexOf(icon) + 1) % 2];
        return newIcon;
    };

    const toggleIcons = () => {      
        const newIcon = getNewIcon();
        setIcon(newIcon);
    };

    const handleClick = (currentPreviewURL, name, artistName, imgSrc) => {
        const play = icon === playIcon; 
        toggleIcons();
        setPlaying({currentPreviewURL, name, artistName, imgSrc, play});
    };

    return (
        <i className={getIconClass()} onClick={e => handleClick(info.previewURL, info.name, info.artist, info.imgSrc)}></i>
    );
}
 
export default PlayIcon;