import PlayIcon from "../PlayIcon/PlayIcon";
import FavouritesIcon from "../FavouritesIcon/FavouritesIcon";

import './ListItem.css'
import Carousel from "../Carousel/Carousel";

const ListItem = ({itemInfo}) => {
    return (
        <li className="list-item me-5 ms-5">
            <img id='list-image' src={itemInfo.imgSrc}></img>
            {itemInfo.playable && <PlayIcon itemInfo={itemInfo}/>}
            {/* <Carousel text={itemInfo.name + (itemInfo.artist ? ', ' + itemInfo.artist : '')}/> */}
            <span className="item-itemInfo">{itemInfo.name + (itemInfo.artist ? ', ' + itemInfo.artist : '')}</span>
            <span className="region" />
            {itemInfo.type === 'track' && <FavouritesIcon trackId={itemInfo.id}/>} 
        </li>
    );
};
 
export default ListItem;