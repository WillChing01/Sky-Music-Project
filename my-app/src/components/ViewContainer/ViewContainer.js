import List from '../List/List';
import Grid from '../Grid/Grid';
import './ViewContainer.css';

const ViewContainer = ({className, data, channelsOpen, currentPreviewURL, setPlaying}) => {
    const channelTypes = ['tracks', 'albums', 'artists'];
    const channels = channelTypes.map(type => (
      {
        type,
        items: data[type],
        open: channelsOpen[type]
      }  
      )
    ); 

    const getView = (channel) => {
        const isGridView = className === 'gridView';
        const props = {
            channelItems: channel.items,
            currentPreviewURL,
            setPlaying
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

    const toTitleCase = (str) => {
        const firstLetter = str.charAt(0);
        const remainingStr = str.slice(1);
        const titleCase = firstLetter.toUpperCase() + remainingStr;
        return titleCase;
    };

    const getChannelDisplay = (channel) => {
        const view = getView(channel); 
        const noView = getNoView(channel);
        const title = toTitleCase(channel.type);
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