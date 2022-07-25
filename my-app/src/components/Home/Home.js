import { getChannelTopInfo, getQueryFetchInfo } from '../../utility/fetchNapster';
import { useSearchParams } from 'react-router-dom';

import ViewContainer from '../ViewContainer/ViewContainer';

import './Home.css';
import useFetch from '../../hooks/useFetch';
const limit = 20;
const getFetchArgs = (query, channel) => {
    const fetchArgs = query ? getQueryFetchInfo(query, channel, limit)
                            : getChannelTopInfo(channel, limit);
    return fetchArgs;
};

const Home = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');
  
  const tracksFetchArgs = getFetchArgs(query, 'tracks');
  const albumsFetchArgs = getFetchArgs(query, 'albums');
  const artistsFetchArgs = getFetchArgs(query, 'artists');

  const deps = [searchParams]
  const tracks = useFetch(...tracksFetchArgs, deps);
  const albums = useFetch(...albumsFetchArgs, deps);
  const artists = useFetch(...artistsFetchArgs, deps);

  const data = {
    tracks, 
    albums, 
    artists
  };

  return (
    <div className='space'>
      {data && <ViewContainer data={data} />}
    </div>
  );
}

export default Home;