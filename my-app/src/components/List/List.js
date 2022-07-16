import { getItemInfo } from "../../utility/parseMusicItem";
import { shouldBeFiltered } from '../../utility/filterResults';

import WrapAlbum from "../WrapAlbum/WrapAlbum";
import ListItem from "../ListItem/ListItem";
import Card from "../Card/Card";

import './List.css';


const List = ({channelItems, currentPreviewURL, play, setPlayingInfo, filter}) => {

    return (
        <div className="list">
            <ul>
                {
                channelItems.map((item, index) => {
                    const itemInfo = getItemInfo(item);
                    if (shouldBeFiltered(itemInfo, filter)) return null;
                    const isAlbum = itemInfo.type === 'album';
                    const key = index;
                    const props = {key, itemInfo, currentPreviewURL, play, setPlayingInfo, filter}; 
                    const card = <Card {...props}/>;
                    const listItem = <ListItem {...props}/>
                    props['card'] = card;
                    props['isCard'] = false;
                    const possiblyWrappedListItem = isAlbum ? <WrapAlbum {...props}>{listItem}</WrapAlbum>: listItem;
                    return possiblyWrappedListItem;   
                })
                }
            </ul>
        </div>
    );
};

export default List;