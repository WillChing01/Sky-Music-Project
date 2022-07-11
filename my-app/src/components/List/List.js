import { getItemInfo } from "../../utility/parseMusicItem";
import PlayIcon from "../PlayIcon/PlayIcon";

const List = ({channelItems, currentPreviewURL, setPlaying}) => {
    
    return (
        <div className="list">
            <ul>
                {
                channelItems.map((item, index) => {
                    const info = getItemInfo(item);
                    return (
                    <li key={index}>
                        {info.playable && <PlayIcon info={info} currentPreviewURL={currentPreviewURL} setPlaying={setPlaying} />}
                        {info.name + (info.artist ? ', ' + info.artist : '')}
                    </li>
                    )
                })
                }
            </ul>
        </div>
    );
};

export default List;