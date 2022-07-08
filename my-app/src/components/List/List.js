import PlayIcon from "../PlayIcon/PlayIcon";

const List = ({ data, getInfo, previewURL, setPlaying }) => {
    
    const handleClick = (previewURL, name, artist) => {
        setPlaying(setPlaying({previewURL, name, artist}));
    };
    
    
    return (
        <div className="list">
            <ul>
                {
                data.map((item, index) => {
                    const info = getInfo(item);
                    return (
                    <li key={index}>
                        {info.playable && <PlayIcon info={info} previewURL={previewURL} setPlaying={setPlaying} />}
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