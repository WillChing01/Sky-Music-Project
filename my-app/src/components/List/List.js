import { getItemInfo } from "../../utility/parseMusicItem";
import { shouldBeFiltered } from '../../utility/filterResults';
import { useSelector } from "react-redux";

import WrapAlbum from "../WrapAlbum/WrapAlbum";
import ListItem from "../ListItem/ListItem";
import Card from "../Card/Card";

import './List.css';

const List = ({channelItems}) => {

    const filter = useSelector((state) => state.filter)

    const getDisplayChannelItem = (item, index) => {
        const itemInfo = getItemInfo(item);
        if (shouldBeFiltered(itemInfo, filter)) return null;
        const isAlbum = itemInfo.type === 'album';
        const card = <Card itemInfo={itemInfo}/>;
        const listItem = <ListItem itemInfo={itemInfo}/>
        const wrapProps = {
            key: index,
            itemInfo,
            card,
            isCard: false
         };
        const possiblyWrappedListItem = isAlbum ? <WrapAlbum {...wrapProps}>
                                                    {listItem}
                                                    </WrapAlbum>
                                                : <div key={index}>
                                                    {listItem}
                                                   </div>
        return possiblyWrappedListItem;   
    };

    return (
        <div className="list">
            <ul>
                {channelItems.map(getDisplayChannelItem)}
            </ul>
        </div>
    );
};

export default List;