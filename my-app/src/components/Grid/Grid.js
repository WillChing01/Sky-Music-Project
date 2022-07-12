import { getItemInfo } from '../../utility/parseMusicItem';
import Card from '../Card/Card';

const Grid = ({channelItems, currentPreviewURL, play, setPlaying}) => {
    console.log("channel items: ", channelItems)

    return (
        <div className='gridView'>
            {channelItems.map((item, index) => 
            <Card key={index}
                  info={getItemInfo(item)}
                  currentPreviewURL={currentPreviewURL} 
                  play={play}
                  setPlaying={setPlaying}
             />
             )
            }
        </div>
    );
}
 
export default Grid;