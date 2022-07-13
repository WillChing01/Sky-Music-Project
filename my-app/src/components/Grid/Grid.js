import { getItemInfo } from '../../utility/parseMusicItem';
import Card from '../Card/Card';
import WrapAlbum from '../WrapAlbum/WrapAlbum';

const Grid = ({channelItems, currentPreviewURL, play, setPlaying}) => {

    return (
        <div className='gridView'>
            {channelItems.map((item, index) => {
                const info = getItemInfo(item);
                const isAlbum = info.type === 'albums'
                const key = index;
                const props = {key, info, currentPreviewURL, play, setPlaying} 
                const card = <Card {...props}/>
                return <Card {...props}/>      
            }
             )
            }
        </div>
    );
}
 
export default Grid;