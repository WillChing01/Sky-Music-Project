import { useAuthContext } from '../../../hooks/useAuthContext';

import PlayIcon from "../../PlayIcon/PlayIcon";
import FavouritesIcon from "../../FavouritesIcon/FavouritesIcon";

import './ListItem.css'

const ListItem = ({itemInfo}) => {
    const { user } = useAuthContext();

    return (
        <li className="list-item me-5 ms-5">
            <img id='list-image' src={itemInfo.imgSrc}></img>
            {itemInfo.playable && <PlayIcon itemInfo={itemInfo}/>}
            <span className="item-info">{itemInfo.name + (itemInfo.artist ? ', ' + itemInfo.artist : '')}</span>
            <span className="region" />
            {itemInfo.type === 'track' && user && <FavouritesIcon trackId={itemInfo.id}/>} 
        </li>
    );
};
 
export default ListItem;