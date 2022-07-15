import PlayIcon from "../PlayIcon/PlayIcon";

import './ListItem.css'

const ListItem = ({key, info, currentPreviewURL, play, setPlaying}) => {
    return (
        <li key={key} className="list-item me-5 ms-5">
            <img id='list-image' src={info.imgSrc}></img>
            {info.playable && <PlayIcon info={info} currentPreviewURL={currentPreviewURL} play={play} setPlaying={setPlaying} />}
            <span className="item-info">{info.name + (info.artist ? ', ' + info.artist : '')}</span>
        </li>
    );
};
 
export default ListItem;