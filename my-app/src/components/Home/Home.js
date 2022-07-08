import { useState, useEffect } from 'react';
import ChannelSelect from '../ChannelSelect/ChannelSelect';
import ViewSelect from '../ViewSelect/ViewSelect';
import SearchBar from '../SearchBar/SearchBar';
import ViewContainer from '../ViewContainer/ViewContainer';
import { useSearchParams } from 'react-router-dom';
import Player from '../Player/Player';

export const header = {headers: {apikey: 'NzQ2YmQ5NmUtODM2MS00ZDg2LTg4NzMtZGE0ZDExZmViN2U3'}};

function Home() {
  const [data, setData] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('grid');
  const [channelsOpen, setChannelsOpen] = useState({albums: true, artists: true, tracks: true});
  const [searchParams, setSearchParams] = useSearchParams();
  const [playing, setPlaying] = useState({previewURL: '', name: '', artistName: '', imgSrc: '', play: false});

  const fetchData = async () => {
    const query = searchParams.get('query');



    if(query) {
      setIsPending(true);
      const res = await fetch(`https://api.napster.com/v2.2/search/verbose?query=${query}`, header);
      const jsonRes = await res.json();
      setIsPending(false);
      setData(jsonRes.search.data);
      return;
    };
    
    // no search
    const newData = {...data};
    setIsPending(true)
    for (const [channel, isOpen] of Object.entries(channelsOpen)) {
      if (isOpen) {
        const fetchUrl = `https://api.napster.com/v2.2/${channel}/top`;
        const res = await fetch(fetchUrl, header);
        const jsonRes = await res.json();
        newData[channel] = jsonRes[channel];
      }
    }
    setIsPending(false);  
    setData(newData);
    
  }

  useEffect(() => {
    setData({});
    fetchData();
                                                                                                                                                            
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