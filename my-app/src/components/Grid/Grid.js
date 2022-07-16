import { shouldBeFiltered } from '../../utility/filterResults';
import { getItemInfo } from '../../utility/parseMusicItem';

import Card from '../Card/Card';
import WrapAlbum from '../WrapAlbum/WrapAlbum';

const Grid = ({channelItems, currentPreviewURL, play, setPlaying, filter}) => {

    return (
        <div className='gridView'>
            {channelItems.map((item, index) => {
                const info = getItemInfo(item);
                if (shouldBeFiltered(info, filter)) return null;
                const isAlbum = info.type === 'album';
                const key = index;
                const props = {key, info, currentPreviewURL, play, setPlaying, filter}; 
                const card = <Card {...props}/>;
                props['card'] = card;
                props['isCard'] = true;
                const possiblyWrappedCard = isAlbum ? <WrapAlbum {...props}>{card}</WrapAlbum>: 
                <div className='m-4'>{card}</div>
                return possiblyWrappedCard;   
            }
            )
           }
        </div>
    );
}
 
export default Grid;