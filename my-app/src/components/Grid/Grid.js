import { useSelector } from 'react-redux';
import { shouldBeFiltered } from '../../utility/filterResults';
import { getItemInfo } from '../../utility/parseMusicItem';

import Card from '../Card/Card';
import WrapAlbum from '../WrapAlbum/WrapAlbum';

import './Grid.css';

const Grid = ({channelItems}) => {

    const filter = useSelector((state) => state.filter);

    return (
        <div className='gridView'>
            {channelItems.map((item, index) => {
                const itemInfo = getItemInfo(item);
                if (shouldBeFiltered(itemInfo, filter)) return null;
                const isAlbum = itemInfo.type === 'album';
                const key = index;
                const props = {key, itemInfo}; 
                const card = <Card {...props}/>;
                props['card'] = card;
                props['isCard'] = true;
                const possiblyWrappedCard = isAlbum ? 
                                            <WrapAlbum {...props}>{card}</WrapAlbum>: 
                                            <div className='m-4' key={index}>{card}</div>
                return possiblyWrappedCard;   
            }
            )
           }
        </div>
    );
}
 
export default Grid;