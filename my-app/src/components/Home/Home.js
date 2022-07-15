import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchQuery, fetchTop } from '../../utility/fetchNapster';
import ViewSelect from '../ViewSelect/ViewSelect';
import SearchBar from '../SearchBar/SearchBar';
import ViewContainer from '../ViewContainer/ViewContainer';
import Player from '../Player/Player';
import FilterControlPanel from '../FilterControlPanel/FilterControlPanel';
import NavBar from '../NavBar/NavBar';
import './Home.css';

function Home() {
  const [data, setData] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState({canRetry: false, message: ''});
  const [view, setView] = useState('grid');
  const [searchParams, setSearchParams] = useSearchParams();
  const [playing, setPlaying] = useState({currentPreviewURL: '', name: '', artistName: '', imgSrc: '', play: false});
  const [filter, setFilter] = useState({channelsOpen: {albums: true, artists: true, tracks: true}, genre: 'all', showExplicit: true})

  const handleDataFetch = () => {
    setData({});
    const updateData = async () => {
      const query = searchParams.get('query');
      setIsPending(true);
      const { newData, error } = query ? 
                      await fetchQuery(query, 1):
                      await fetchTop(filter.channelsOpen, 3);
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
      <NavBar view={view} setView={setView} searchParams={searchParams} setSearchParams={setSearchParams} filter={filter} setFilter={setFilter}/>
      {isPending && 'Loading...'}
      { !isPending && error && <span>{error.message}</span> }
      {!!Object.keys(data).length && ( 
      view === 'grid' ?
      <ViewContainer className='gridView' data={data} filter={filter} playing={playing} setPlaying={setPlaying}/>:
      <ViewContainer className='listView' data={data} filter={filter} playing={playing} setPlaying={setPlaying}/>
      )
      }
      <Player playing={playing} setPlaying={setPlaying}></Player>
    </div>
  );
}


export default Home;