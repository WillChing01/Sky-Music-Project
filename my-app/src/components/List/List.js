const List = ({ data, getInfo }) => {
    return (
        <div className="container list">
            <ul>
                {
                data.map((item, index) => {
                    const info = getInfo(item);
                    return (
                    <li key={index}>
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