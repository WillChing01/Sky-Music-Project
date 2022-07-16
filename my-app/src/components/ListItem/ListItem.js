import PlayIcon from "../PlayIcon/PlayIcon";

import './ListItem.css'

const ListItem = ({itemInfo, currentPreviewURL, play, setPlayingInfo}) => {
    return (
        <li className="list-item me-5 ms-5">
            <img id='list-image' src={itemInfo.imgSrc}></img>
            {itemInfo.playable && <PlayIcon itemInfo={itemInfo} currentPreviewURL={currentPreviewURL} play={play} setPlayingInfo={setPlayingInfo} />}
            <span className="item-itemInfo">{itemInfo.name + (itemInfo.artist ? ', ' + itemInfo.artist : '')}</span>
        </li>
    );
};
 
export default ListItem;