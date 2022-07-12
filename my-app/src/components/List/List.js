import { getItemInfo } from "../../utility/parseMusicItem";
import PlayIcon from "../PlayIcon/PlayIcon";

const List = ({channelItems, currentPreviewURL, play, setPlaying}) => {
    
    return (
        <div className="list">
            <ul>
                {
                channelItems.map((item, index) => {
                    const info = getItemInfo(item);
                    return (
                    <li key={index}>
                        {info.playable && <PlayIcon info={info} currentPreviewURL={currentPreviewURL} play={play} setPlaying={setPlaying} />}
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