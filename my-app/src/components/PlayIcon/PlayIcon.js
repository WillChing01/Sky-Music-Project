// import './PlayIcon.css';
import { useState } from 'react';

const PlayIcon = ({info, previewURL, setPlaying}) => {
    const [icon, setIcon] = useState("bi-play-fill");

    const handleClick = (previewURL, name, artistName, imgSrc) => {
        const icons = ["bi-play-fill", "bi-pause"];
        const play = icon === "bi-play-fill";
        setIcon(icons[(icons.indexOf(icon) + 1) % 2]);
        setPlaying({previewURL, name, artistName, imgSrc, play});
    };

    return (
        <i className={`bi ${info.previewURL === previewURL && 'display'} ${icon}`} onClick={e => handleClick(info.previewURL, info.name, info.artist, info.imgSrc)}></i>
    );
}
 
export default PlayIcon;