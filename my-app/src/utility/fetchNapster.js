import { listArrOfStrsAsStr } from "./format/formatArr";
import { makeSingular } from "./format/formatStr";



/**
 * channel = {track, album, artist}
*/
const getQueryURL = (query, channel, limit) => {
  const limitParam = limit ? `&per_type_limit=${limit}` : '';
  const queryURL = `https://api.napster.com/v2.2/search/verbose?type=${makeSingular(channel)}&query=${query}${limitParam}`;
  return queryURL;
};

export const getQueryFetchInfo = (query, channel, limit) => {
  const queryKeys = ['search', 'data', channel];
  const queryURL = getQueryURL(query, channel, limit);
  return [queryURL, queryKeys];
};

const getChannelTopURL = (channel, limit) => {
  const limitParam = limit ? `?limit=${limit}` : '';
  const channelTopURL = `https://api.napster.com/v2.2/${channel}/top${limitParam}`;
  return channelTopURL;
};

/**
 * channel = {tracks, albums, artists}
 */
export const getChannelTopInfo = (channel, limit) => {
  const channelTopKeys = [channel];
  const channelTopURL = getChannelTopURL(channel, limit);
  return [channelTopURL, channelTopKeys];
};


export const getDataByKeys = (candidate, keys) => {
  return keys.reduce((currentObj, nextKey) => currentObj[nextKey], candidate);
};


const getGenresURL = (genresIds) => {
  const idsStr = listArrOfStrsAsStr(genresIds, ',');
  const idsPath = idsStr && `/${idsStr}`;
  const genresURL = `https://api.napster.com/v2.2/genres${idsPath}`;
  return genresURL;
}

export const getGenresInfo = (genresIds) => {
  const genresKeys = ['genres'];
  const genresURL = getGenresURL(genresIds);
  return [genresURL, genresKeys];
}

// export const fetchAlbumTracks = async (albumId) => {
//   const fetchURL = `https://api.napster.com/v2.2/albums/${albumId}/tracks`;
//   const fetchInfo = await tryFetch(fetchURL, 'tracks');
//   return fetchInfo; 
// };

const getAlbumTracksURL = (albumId) => {
  const albumTracksURL = `https://api.napster.com/v2.2/albums/${albumId}/tracks`;
  return albumTracksURL;
}


export const getAlbumTracksInfo = (albumId) => {
  const albumTracksKeys = ['tracks'];
  const albumTracksURL = getAlbumTracksURL(albumId);
  return [albumTracksURL, albumTracksKeys];
};



/**
 * Old file
 *      |
 *      |
 *      v
 */

const header = { headers: { apikey: 'NzQ2YmQ5NmUtODM2MS00ZDg2LTg4NzMtZGE0ZDExZmViN2U3' } };
//const header = {headers: {apikey: ''}};

const getFetchErr = (err) => {
  const error = {};
  if (err.status >= 500) {
    error['canRetry'] = true;
    error['message'] = 'We couldn\'t connect to the server.';
  } else if (err.status === 404) {
    error['canRetry'] = false;
    error['message'] = 'The resource could not be found.'
  } else if (err.status >= 400) {
    error['canRetry'] = true;
    error['message'] = 'There was a problem fetching the data.';
  }
  return error;
};


const getNewData = (candidate, ...keys) => {
  return keys.reduce((currentObj, nextKey) => currentObj[nextKey], candidate);
};

const tryFetch = async (fetchURL, ...keys) => {
  const res = await fetch(fetchURL, header);
  const fetchInfo = {};
  if (!res.ok) {
    fetchInfo['newData'] = {};
    fetchInfo['error'] = getFetchErr(res);
  } else {
    const candidateData = await res.json();
    fetchInfo['newData'] = getNewData(candidateData, ...keys);
    fetchInfo['error'] = null;
  }
  return fetchInfo;
};

export const fetchQuery = async (query, limit) => {
  const limitParam = limit ? `&per_type_limit=${limit}` : '';
  const fetchURL = `https://api.napster.com/v2.2/search/verbose?query=${query}${limitParam}`;
  const fetchInfo = await tryFetch(fetchURL, 'search', 'data');
  return fetchInfo;
};

const fetchChannelTop = async (channel, limit) => {
  const limitParam = limit ? `?limit=${limit}` : '';
  const fetchURL = `https://api.napster.com/v2.2/${channel}/top${limitParam}`;
  const fetchInfo = await tryFetch(fetchURL, channel);
  const channelData = fetchInfo['newData'];
  const channelError = fetchInfo['error'];
  const channelInfo = {channelData , channelError};
  return channelInfo;
};


export const fetchTop = async (limit) => {
  const channels = ['tracks', 'albums', 'artists']
  const newData = {};
  const error = null;
  for (const channel of channels) {
      // get channel URL & keys
      // { data, error, pendingMsg, fetchAttempsLeft } = useFetch(URL, keys)
      // 
      const { channelData, channelError } = await fetchChannelTop(channel, limit);
      if (channelError) return { newData: {}, error: channelError };
      newData[channel] = channelData;
  }
  return { newData, error };
};


