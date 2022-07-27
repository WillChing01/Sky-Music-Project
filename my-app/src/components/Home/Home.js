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

const apikey = process.env.REACT_APP_NAPSTER_API_KEY;

const Home = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');
  
  const tracksFetchArgs = getFetchArgs(query, 'tracks');
  const albumsFetchArgs = getFetchArgs(query, 'albums');
  const artistsFetchArgs = getFetchArgs(query, 'artists');

  const deps = [searchParams];
  const fetchOptions = {headers: { apikey }};

  const tracks = useFetch(...tracksFetchArgs, deps, fetchOptions);
  const albums = useFetch(...albumsFetchArgs, deps, fetchOptions);
  const artists = useFetch(...artistsFetchArgs, deps, fetchOptions);

  const data = {
    tracks, 
    albums, 
    artists
  };

  const getTrendingTitle = () => {
    if (!query) {
      return (
        <div className='home-center border'>
            <h1 className='indent'>Trending</h1>
        </div>
      );
    } else return null;
  }

  return (
    <div className='space'>
      { getTrendingTitle() }
      { data && <ViewContainer data={data} /> }
    </div>
  );
}

export default Home;