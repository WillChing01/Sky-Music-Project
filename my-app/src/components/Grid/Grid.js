import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { shouldBeFiltered } from '../../utility/filterResults';
import { getItemInfo } from '../../utility/parseMusicItem';

import Card from '../Card/Card';
import WrapAlbum from '../WrapAlbum/WrapAlbum';

import './Grid.css';

const Grid = ({channelItems}) => {

    // const {data, error, pendingMsg } = useFetch(args);

    const filter = useSelector((state) => state.filter);

    const getDisplayChannelItem = (item, index) => {
        const itemInfo = getItemInfo(item);
        if (shouldBeFiltered(itemInfo, filter)) return null;
        const isAlbum = itemInfo.type === 'album';
        const card = <Card itemInfo={itemInfo}/>;
        const wrapProps = {
            key: index,
            itemInfo,
            card,
            isCard: true
        };
        const possiblyWrappedCard = isAlbum ? <WrapAlbum {...wrapProps}>
                                                {card}
                                              </WrapAlbum>
                                            : <div className='m-4' key={index}>
                                                {card}
                                               </div>
        return possiblyWrappedCard;   
    };

    return (
        <div className='grid-view'>
            {channelItems.map(getDisplayChannelItem)}
        </div>
    );
}
 
export default Grid;