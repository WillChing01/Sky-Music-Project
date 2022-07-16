import { captilizeFirstLetter } from '../../utility/formatStr';

import List from '../List/List';
import Grid from '../Grid/Grid';
import './ViewContainer.css';

const ViewContainer = ({className, data, filter, playingInfo, setPlayingInfo}) => {
    const {currentPreviewURL, play} = playingInfo;
    const channelTypes = ['tracks', 'albums', 'artists'];
    const channels = channelTypes.map(type => (
      {
        type,
        items: data[type],
        open: filter.channelsOpen[type]
      }  
      )
    ); 

    const getView = (channel) => {
        const isGridView = className === 'gridView';
        const props = {
            channelItems: channel.items,
            currentPreviewURL,
            setPlayingInfo,
            play,
            filter
        };
        const GridView = <Grid {...props}/>;
        const ListView = <List {...props}/>; 
        const view = isGridView ? GridView: ListView;
        
        return view;
    };

    const getNoView = (channel) => {
        const noView = <p>No {channel.type} were found</p>;
        return noView;
    };

    const getChannelDisplay = (channel) => {
        const view = getView(channel); 
        const noView = getNoView(channel);
        const title = captilizeFirstLetter(channel.type);
        const body = channel.items.length ? 
                     view:
                     noView;
        return (
            <>
                <h1>{title}</h1>
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
                }           
            })  
            }
        </div>
    );
};
 
export default ViewContainer;