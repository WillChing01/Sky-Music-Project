import PlayIcon from "../PlayIcon/PlayIcon";

import './ListItem.css'

const ListItem = ({key, itemInfo, currentPreviewURL, play, setPlayingInfo}) => {
    return (
        <li key={key} className="list-item me-5 ms-5">
            <img id='list-image' src={itemInfo.imgSrc}></img>
            {itemInfo.playable && <PlayIcon itemInfo={itemInfo} currentPreviewURL={currentPreviewURL} play={play} setPlayingInfo={setPlayingInfo} />}
            <span className="item-itemInfo">{itemInfo.name + (itemInfo.artist ? ', ' + itemInfo.artist : '')}</span>
        </li>
    );
};
 
export default ListItem;