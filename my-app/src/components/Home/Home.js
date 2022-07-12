import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchQuery, fetchTop } from '../../utility/fetchNapster';
import ChannelSelect from '../ChannelSelect/ChannelSelect';
import ViewSelect from '../ViewSelect/ViewSelect';
import SearchBar from '../SearchBar/SearchBar';
import ViewContainer from '../ViewContainer/ViewContainer';
import Player from '../Player/Player';
import './Home.css';

function Home() {
  const [data, setData] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('grid');
  const [channelsOpen, setChannelsOpen] = useState({albums: true, artists: true, tracks: true});
  const [searchParams, setSearchParams] = useSearchParams();
  const [playing, setPlaying] = useState({currentPreviewURL: '', name: '', artistName: '', imgSrc: '', play: false});

  useEffect(() => {
    setData({});
    const updateData = async () => {
      const query = searchParams.get('query');
      setIsPending(true);
      const newData = query ? 
                      await fetchQuery(query, 1):
                      await fetchTop(data, channelsOpen, 1);
      setIsPending(false);
      setData(newData);
    };
    updateData();                                                                                 
  }, [searchParams]);

  return (
    <div className='space'>
      <SearchBar initialSearch={searchParams.get("query") || ''} searchParams={searchParams} setSearchParams={setSearchParams}/>
      <ChannelSelect setChannelsOpen={setChannelsOpen} channelsOpen={channelsOpen}/>
      <ViewSelect view={view} setView={setView}/>
      {isPending && 'Loading...'}
      {!!Object.keys(data).length && (
      view === 'grid' ?
      <ViewContainer className='gridView' data={data} channelsOpen={channelsOpen} currentPreviewURL={playing.currentPreviewURL} setPlaying={setPlaying}/>:
      <ViewContainer className='listView' data={data} channelsOpen={channelsOpen} currentPreviewURL={playing.currentPreviewURL} setPlaying={setPlaying}/>
      )
      }
      <Player playing={playing}></Player>
    </div>
  );
}


export default Home;