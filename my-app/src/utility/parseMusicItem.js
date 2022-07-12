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

export const getItemInfo = (item) => {
    const name = item.name;
    const imgSrc = getImgSrc(item);
    const artist = getDisplayedArtist(item);
    const playable = getPlayable(item);
    const previewURL = getPreviewURL(item);

    return {
      name,
      imgSrc,
      artist,
      playable,
      previewURL
    };
  };