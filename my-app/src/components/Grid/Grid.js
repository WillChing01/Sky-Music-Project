import { useSelector } from 'react-redux';
import { shouldBeFiltered } from '../../utility/filterResults';
import { getItemInfo } from '../../utility/parseMusicItem';

import Card from '../Card/Card';
import WrapAlbum from '../WrapAlbum/WrapAlbum';
import WrapArtist from '../WrapArtist/WrapArtist';

import './Grid.css';

const Grid = ({channelItems}) => {
    const filter = useSelector((state) => state.filter);

    const getDisplayChannelItem = (item, index) => {
        const itemInfo = getItemInfo(item);
        if (shouldBeFiltered(itemInfo, filter)) return null;
        const card = <Card itemInfo={itemInfo}/>;
        const wrapProps = {
            key: index,
            itemInfo,
            card,
            isCard: true
        };
        switch (itemInfo.type) {
            case 'track':
                return <div className='m-4' key={index}>
                          {card}
                       </div>;
            case 'album': 
                return <WrapAlbum {...wrapProps}>
                          {card}
                       </WrapAlbum>;
            case 'artist':
                return <WrapArtist {...wrapProps}>
                          {card}
                       </WrapArtist>;
        }
    };

    return (
        <div className='grid-view'>
            {channelItems.map(getDisplayChannelItem)}
        </div>
    );
}
 
export default Grid;