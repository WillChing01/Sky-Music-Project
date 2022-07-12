import { getItemInfo } from "../../utility/parseMusicItem";
import PlayIcon from "../PlayIcon/PlayIcon";
import './List.css';

const List = ({channelItems, currentPreviewURL, play, setPlaying}) => {
    
    return (
        <div className="list">
            <ul>
                {
                channelItems.map((item, index) => {
                    const info = getItemInfo(item);
                    return (
                    <li key={index} className="me-5 ms-5">
                        <img id='list-image' src={info.imgSrc}></img>
                        {info.playable && <PlayIcon info={info} currentPreviewURL={currentPreviewURL} play={play} setPlaying={setPlaying} />}
                        <span className="item-info">{info.name + (info.artist ? ', ' + info.artist : '')}</span>
                    </li>
                    )
                })
                }
            </ul>
        </div>
    );
};

export default List;