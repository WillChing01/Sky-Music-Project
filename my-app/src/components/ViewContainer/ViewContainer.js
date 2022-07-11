import './ViewContainer.css';
import Card from '../Card/Card';
import List from '../List/List';

const ViewContainer = ({className, data, channelsOpen, currentPreviewURL, setPlaying}) => {
    const {artists, albums, tracks} = data;
    const channels = [
        {type: 'tracks', items: tracks, open: channelsOpen['tracks']},
        {type: 'albums', items: albums, open: channelsOpen['albums']},
        {type: 'artists', items: artists, open: channelsOpen['artists']}
    ];
  
    
    const getInfo = (item) => {
        const [type, size] = item.type === 'artist' ? ['artists', '633x422'] : ['albums', '500x500'];
        const id = item.type === 'track' ? item.albumId : item.id;
        return {
          name: item.name,
          imgSrc: `https://api.napster.com/imageserver/v2/${type}/${id}/images/${size}.jpg`,
          artist: 'artistName' in item ? item.artistName : '',
          playable: item.type === 'track',
          previewURL: 'previewURL' in item ? item.previewURL : ''
        };
      };

    const firstLetterCapital = (e) => {
        return e.charAt(0).toUpperCase() + e.slice(1);
    }

    return (
        <div>
            {
            channels.map((channel, index) => {
                if(!channel.open) return null;
                const noView = <p>No {channel.type} were found</p> 
                const view = className === 'gridView' ? 
                        <div className='gridView'>
                            {channel.items.map((item, index) => <Card key={index} info={getInfo(item)} currentPreviewURL={currentPreviewURL} setPlaying={setPlaying}/>)}
                        </div>
                        :
                        <List data={channel.items} getInfo={getInfo} currentPreviewURL={currentPreviewURL} setPlaying={setPlaying}/>
                return (
                    <div key={index}>
                        <h1>{firstLetterCapital(channel.type)}</h1>
                        {!!channel.items.length ? view: noView}
                    </div>
                );
            })  
            }
        </div>
    );
};
 
export default ViewContainer;