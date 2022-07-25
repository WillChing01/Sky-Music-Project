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

const getAlbumTracksURL = (albumId) => {
  const albumTracksURL = `https://api.napster.com/v2.2/albums/${albumId}/tracks`;
  return albumTracksURL;
}


export const getAlbumTracksInfo = (albumId) => {
  const albumTracksKeys = ['tracks'];
  const albumTracksURL = getAlbumTracksURL(albumId);
  return [albumTracksURL, albumTracksKeys];
};


export const getIsFetchResolved = (fetchResult) => {
  const hasItems = !!fetchResult.items.length;
  const hasError = !!fetchResult.error.statusCode;
  return hasItems || hasError;
};

export const getAreFetchesResolved = (...fetchResults) => {
  for (const fetchResult of fetchResults) {
      const isFetchResolved = getIsFetchResolved(fetchResult);
      if (!isFetchResolved) return false;
  }
  return true;
};