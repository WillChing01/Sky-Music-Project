import { useEffect } from 'react';
import { captilizeFirstLetter } from '../../utility/format/formatStr';
import { useSelector, useDispatch } from 'react-redux';
import { getPlaylistInfo } from '../../utility/parseMusicItem';
import { pushPlaylist } from '../../state/slices/playablePlaylist/playablePlaylistSlice';

import List from '../List/List';
import Grid from '../Grid/Grid';

import './ViewContainer.css';

const ViewContainer = ({ data }) => {
    const channelsOpen = useSelector((state) => state.filter.channelsOpen);
    const view = useSelector((state) => state.view.value);
    const dispatch = useDispatch();

    const channelTypes = ['tracks', 'albums', 'artists'];
    const channels = channelTypes.map(type => (
        {
        type,
        open: channelsOpen[type],
        ...data[type]
      }  
      )
    ); 

    useEffect(() => {
        const playlist = getPlaylistInfo(channels[0].items);
        dispatch(pushPlaylist(playlist));
    }, [data]);

    const getDisplay = (channel) => {
        const isGridView = view === 'grid';
        const props = {
            channelItems: channel.items,
        };
        const GridDisplay = <Grid {...props}/>;
        const ListDisplay = <List {...props}/>; 
        const display = isGridView ? GridDisplay : ListDisplay;
        
        return display;
    };

    const getNoDisplay = (channel) => {
        const noDisplay = <p className='indent'>No {channel.type} were found</p>;
        return noDisplay;
    };

    const getChannelDisplay = (channel) => {
        const display = getDisplay(channel); 
        const noDisplay = getNoDisplay(channel);
        const title = captilizeFirstLetter(channel.type);
        let body;
        if (channel.pendingMsg) body = <p>{channel.pendingMsg}</p>;
        else if (channel.error.statusCode) body = <p>{channel.error.userMsg}</p>
        else body = channel.items.length ? display : noDisplay;

        return (
            <>
                <h1 className='indent'>{title}</h1>
                    {body}
            </>
        );
    };

    return (
        <div>
            {
            channels.map((channel, index) => {
                if (channel.open) {
                    const channelDisplay = getChannelDisplay(channel);
                    return (
                        <div key={index}>
                            {channelDisplay}
                        </div>
                    )
                } else {
                    return null;
                }         
            })  
            }
        </div>
    );
};
 
export default ViewContainer;