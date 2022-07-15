const getImgInfo = (item) => {
    const isTrack = item.type === 'track';
    const isArtist = item.type === 'artist';
    const id = isTrack ? 
               item.albumId :
               item.id; 
    const [type, size] = isArtist ? 
                        ['artists','633x422']: 
                        ['albums', '500x500'];
    return {id, type, size}
};

const getDisplayedArtist = (item) => {
    const hasArtistName = 'artistName' in item;
    const displayedName = hasArtistName ?
                          item.artistName:
                          '';
    return displayedName;
};

const getPlayable = (item) => {
    const isTrack = item.type === 'track'
    return isTrack;
};

const getImgSrc = (item) => {
    const {id, type, size} = getImgInfo(item);
    return `https://api.napster.com/imageserver/v2/${type}/${id}/images/${size}.jpg`;
};

const getPreviewURL = (item) => {
    const hasPreview = 'previewURL' in item;
    const previewURL = hasPreview ?
                       item.previewURL:
                       '';
    return previewURL;
};

const getNumTracks = (item) => {
    if (item.type === 'album') return item.trackCount;
    else if (item.type === 'track') return 1; 
    else return 0;
}

const getIsExplicit = (item) => {
    if (item.type === 'track') return item.isExplicit;
    else if (item.type === 'album') return item.tags.includes('Explicit');
    else return false;
}

const getReleaseDate = (item) => {
    if (item.type === 'artist') return null;
    else {
        const releaseDate = new Date(item.released);
        const formatDateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedReleaseDate = releaseDate.toLocaleDateString("en-US", formatDateOptions);
        return formattedReleaseDate;
    }
};

const getFeaturedArtists = (item) => {
    if (item.type === 'album') {
        const features = item.contributingArtists.featuredPerformer;
        if (features) return features;
    }
    return null;
};

const getGenres = (item) => {
    const genresExist = item.links.genres;
    if(!genresExist) return [];
    else return genresExist.ids;
};


export const getItemInfo = (item) => {
    const id = item.id;
    const name = item.name;
    const type = item.type;
    const genres = getGenres(item);
    const imgSrc = getImgSrc(item);
    const artist = getDisplayedArtist(item);
    const playable = getPlayable(item);
    const previewURL = getPreviewURL(item);
    const numTracks = getNumTracks(item);
    const isExplicit = getIsExplicit(item);
    const releaseDate = getReleaseDate(item);
    const features = getFeaturedArtists(item);

    return {
      id, 
      name,
      type,
      genres,
      imgSrc,
      artist,
      playable,
      previewURL,
      numTracks,
      isExplicit,
      releaseDate,
      features
    };
  };