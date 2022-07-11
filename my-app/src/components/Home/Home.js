import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchQuery, fetchTop } from '../../utility/fetchNapster';
import ChannelSelect from '../ChannelSelect/ChannelSelect';
import ViewSelect from '../ViewSelect/ViewSelect';
import SearchBar from '../SearchBar/SearchBar';
import ViewContainer from '../ViewContainer/ViewContainer';
import Player from '../Player/Player';

function Home() {
  const [data, setData] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('grid');
  const [channelsOpen, setChannelsOpen] = useState({albums: true, artists: true, tracks: true});
  const [searchParams, setSearchParams] = useSearchParams();
  const [playing, setPlaying] = useState({previewURL: '', name: '', artistName: '', imgSrc: '', play: false});

  useEffect(() => {
    setData({});
    const updateData = async () => {
      const query = searchParams.get('query');
      setIsPending(true);
      const newData = query ? 
                      await fetchQuery(query):
                      await fetchTop(data, channelsOpen);
      setIsPending(false);
      setData(newData);
    };
    updateData();                                                                                 
  }, [searchParams]);

  return (
    <div>
      <SearchBar initialSearch={searchParams.get("query") || ''} searchParams={searchParams} setSearchParams={setSearchParams}/>
      <ChannelSelect setChannelsOpen={setChannelsOpen} channelsOpen={channelsOpen}/>
      <ViewSelect view={view} setView={setView}/>
      {isPending && 'Loading...'}
      {!!Object.keys(data).length && (
      view === 'grid' ?
      <ViewContainer className='gridView' data={data} channelsOpen={channelsOpen} previewURL={playing.previewURL} setPlaying={setPlaying}/>:
      <ViewContainer className='listView' data={data} channelsOpen={channelsOpen} previewURL={playing.previewURL} setPlaying={setPlaying}/>
      )
      }
      <Player playing={playing}></Player>
    </div>
  );
}


export default Home;