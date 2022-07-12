import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchQuery, fetchTop } from '../../utility/fetchNapster';
import ChannelSelect from '../ChannelSelect/ChannelSelect';
import ViewSelect from '../ViewSelect/ViewSelect';
import SearchBar from '../SearchBar/SearchBar';
import ViewContainer from '../ViewContainer/ViewContainer';
import Player from '../Player/Player';
import GenreSelect from '../GenreSelect/GenreSelect';
import './Home.css';

function Home() {
  const [data, setData] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState({canRetry: false, message: ''});
  const [view, setView] = useState('grid');
  const [channelsOpen, setChannelsOpen] = useState({albums: true, artists: true, tracks: true});
  const [searchParams, setSearchParams] = useSearchParams();
  const [playing, setPlaying] = useState({currentPreviewURL: '', name: '', artistName: '', imgSrc: '', play: false});

  const handleDataFetch = () => {
    setData({});
    const updateData = async () => {
      const query = searchParams.get('query');
      setIsPending(true);
      const { newData, error } = query ? 
                      await fetchQuery(query, 6):
                      await fetchTop(channelsOpen, 1);
      if (error) setError(error);
      else setData(newData);
      setIsPending(false);
    };
    updateData();  
  };

  useEffect(() => {
    const threshold = 5;
    // const count = error.count || 0
    let errorCount = 0;
    do {
      handleDataFetch();
      if (!error) break;
    } while (errorCount++ < threshold && error.canRetry)
                                                                        
  }, [searchParams]);


  return (
    <div className='space'>
      <SearchBar initialSearch={searchParams.get("query") || ''} searchParams={searchParams} setSearchParams={setSearchParams}/>
      <GenreSelect />
      <ChannelSelect setChannelsOpen={setChannelsOpen} channelsOpen={channelsOpen}/>
      <ViewSelect view={view} setView={setView}/>
      {isPending && 'Loading...'}
      { !isPending && error && <span>{error.message}</span> }
      {!!Object.keys(data).length && ( 
      view === 'grid' ?
      <ViewContainer className='gridView' data={data} channelsOpen={channelsOpen} playing={playing} setPlaying={setPlaying}/>:
      <ViewContainer className='listView' data={data} channelsOpen={channelsOpen} playing={playing} setPlaying={setPlaying}/>
      )
      }
      <Player playing={playing} setPlaying={setPlaying}></Player>
    </div>
  );
}


export default Home;