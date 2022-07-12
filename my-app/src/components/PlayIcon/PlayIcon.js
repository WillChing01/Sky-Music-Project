import { useEffect, useState } from 'react';
import "./PlayIcon.css";


const PlayIcon = ({info, currentPreviewURL, play, setPlaying}) => {
    const [icon, setIcon] = useState('bi-play-fill');

    useEffect(() => {
        const currentTrack = info.previewURL === currentPreviewURL;
        if(currentTrack) play ? setIcon('bi-pause') : setIcon('bi-play-fill');
        else setIcon('bi-play-fill');
    }, [currentPreviewURL, play]);   

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