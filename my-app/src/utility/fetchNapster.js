const header = { headers: { apikey: 'NzQ2YmQ5NmUtODM2MS00ZDg2LTg4NzMtZGE0ZDExZmViN2U3' } };
//const header = {headers: {apikey: ''}};

const getFetchErr = (err) => {
  const error = {};
  if (err.status >= 500) {
    error['canRetry'] = true;
    error['message'] = 'We couldn\'t connect to the server.';
  } else if (err.status == 404) {
    error['canRetry'] = false;
    error['message'] = 'The resource could not be found.'
  } else if (err.status >= 400) {
    error['canRetry'] = true;
    error['message'] = 'There was a problem fetching the data.';
  }
  return error;
};

const getNewData = (candidate, ...keys) => {
  for(let key of keys) {
    candidate = candidate[key];
  }
  return candidate;
};

const tryFetch = async (fetchUrl, ...keys) => {
  const res = await fetch(fetchUrl, header);
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
  const fetchUrl = `https://api.napster.com/v2.2/search/verbose?query=${query}${limitParam}`
  const fetchInfo = await tryFetch(fetchUrl, 'search', 'data');
  return fetchInfo;
};

const fetchChannelTop = async (channel, limit) => {
  const limitParam = limit ? `?limit=${limit}` : '';
  const fetchUrl = `https://api.napster.com/v2.2/${channel}/top${limitParam}`;
  const fetchInfo = await tryFetch(fetchUrl, channel);
  const channelData = fetchInfo['newData'];
  const channelError = fetchInfo['error'];
  const channelInfo = {channelData , channelError};
  return channelInfo;
};


export const fetchTop = async (channelsOpen, limit) => {
  const newData = {};
  const error = null;
  for (const [channel, isOpen] of Object.entries(channelsOpen)) {
    if (isOpen) {
      const { channelData, channelError } = await fetchChannelTop(channel, limit);
      if (channelError) return { newData: {}, error: channelError };
      newData[channel] = channelData;
    }
  }
  return { newData, error };
};


export const fetchAlbumTracks = async (albumId, limit) => {
  const limitParam = limit ? `?limit=${limit}` : '';
  const fetchUrl = `https://api.napster.com/v2.2/albums/${albumId}/tracks${limitParam}`;
  const fetchInfo = await tryFetch(fetchUrl, 'tracks');
  return fetchInfo;
};

export const fetchGenre = async () => {
  const fetchUrl = 'https://api.napster.com/v2.2/genres';
  const fetchInfo = await tryFetch(fetchUrl, 'genres');
  return fetchInfo;
}