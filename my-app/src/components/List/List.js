import PlayIcon from "../PlayIcon/PlayIcon";

const List = ({ data, getInfo, currentPreviewURL, setPlaying }) => {
    
    return (
        <div className="list">
            <ul>
                {
                data.map((item, index) => {
                    const info = getInfo(item);
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