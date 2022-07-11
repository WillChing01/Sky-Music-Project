import { getItemInfo } from '../../utility/parseMusicItem';
import Card from '../Card/Card';

const Grid = ({channelItems, currentPreviewURL, setPlaying}) => {
    console.log("channel items: ", channelItems)

    return (
        <div className='gridView'>
            {channelItems.map((item, index) => 
            <Card key={index}
                  info={getItemInfo(item)}
                  currentPreviewURL={currentPreviewURL} 
                  setPlaying={setPlaying}
             />
             )
            }
        </div>
    );
}
 
export default Grid;