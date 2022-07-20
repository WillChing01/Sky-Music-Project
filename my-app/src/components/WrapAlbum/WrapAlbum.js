import { useEffect, useState } from 'react'
import { fetchAlbumTracks, fetchGenre, fetchArtists } from '../../utility/fetchNapster' 
import { listArrOfStrsAsStr } from '../../utility/format/formatArr';

import Dialog from '../Dialog/Dialog';
import List from '../List/List'

import './WrapAlbum.css'

const WrapAlbum = ({children, card, itemInfo, isCard}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // I dream of const {tracks, genres, features} = useFetch(fetchAlbumInfo);
    const [tracks, setTracks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        const updateAlbumInfo = async () => {
            const albumGenres = await getAlbumGenres();
            const albumFeatures = await getAlbumFeatures();
            const albumTracks = await getAlbumTracks();
            setGenres(albumGenres);
            setFeatures(albumFeatures);
            setTracks(albumTracks);
        };
        updateAlbumInfo();
    },[]);
    

    const getAlbumTracks = async () => {
        const { newData: albumTracks } = await fetchAlbumTracks(itemInfo.id, 1);
        return albumTracks;
    };

    const getAlbumGenres = async () => {
        const genresIds = itemInfo.genres;
        const genreList = listArrOfStrsAsStr(genresIds, ',');
        const { newData: genres } = await fetchGenre(genreList);
        return genres;
    };

    const getAlbumFeatures = async () => {
        const defaultFeatures = [];
        const featuresIdStr = itemInfo.features;
        const hasFeatures = !!featuresIdStr;
        if (hasFeatures) {
            const featuredArtists = await fetchArtists(featuresIdStr);
            return featuredArtists;
        } else return defaultFeatures;
     };


    const listAlbumGenres = () => {
        const genreNames = genres.map(genre => genre.name);
        const genresStrList = listArrOfStrsAsStr(genreNames, ', ');
        return genresStrList;
    };

    const listFeaturedArtists = () => {
        const featuresStrList = listArrOfStrsAsStr(features, ', ');
        return featuresStrList;
    };

    const getNumTracksMessage = () => {
        return (
            <span>
                <strong>{itemInfo.name}</strong> has <strong>{itemInfo.numTracks} tracks</strong>. 
            </span>
        );
    }

    const getReleaseMessage = () => {
        return (
            <span> 
                &nbsp;It was released on <em>{itemInfo.releaseDate}</em>.
            </span>
        );
    };

    const getIsExplicitMessage = () => {
        const defaultExplicitMsg = '';
        const explicitIcon = (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-explicit-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 0A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0h-11Zm4.326 10.88H10.5V12h-5V4.002h5v1.12H6.826V7.4h3.457v1.073H6.826v2.408Z"/>
                                </svg>
                             );
        if (itemInfo.isExplicit) { 
            const explicitMsg = (
                                    <span>
                                    &nbsp; The album has been rated <strong>explicit</strong> {explicitIcon}.
                                    </span>
                                );
            return explicitMsg;
        } else return defaultExplicitMsg;
    };

    const getFeaturesMessage = () => {
        const defaultFeaturesMsg = ''; 
        const featuresListStr = listFeaturedArtists();
        if (featuresListStr) {
            const featuresMsg = (
                                 <span>
                                    &nbsp;The album has <strong>features</strong> from <em>{featuresListStr}</em>.
                                 </span>
                                );
            return featuresMsg
        } else return defaultFeaturesMsg;
    };

    const getGenresMessage = () => {
        const defaultGenresMsg = '';
        const genresListStr = listAlbumGenres();
        if (genresListStr) {
            const genresMsg = (
                                  <span>
                                     &nbsp;Album <strong>genres:</strong> <em>{genresListStr}</em>.
                                  </span>
                              ); 
            return genresMsg;
        } else return defaultGenresMsg;
    };


    const getAlbumInfoMessage = () => {
        const numTracksMessage = getNumTracksMessage();
        const releaseMessage = getReleaseMessage();
        const isExplicitMessage = getIsExplicitMessage();
        const featuresMessage = getFeaturesMessage();
        const genresMessage = getGenresMessage();

        return (
        <div className='album-info-msg mb-1 p-3'>
            {numTracksMessage}
            {releaseMessage}
            {isExplicitMessage}
            {featuresMessage}
            {genresMessage}
        </div>
        );
    };


    const getIsAlbumInfoLoaded = () => {
        const isAlbumInfoLoaded = !!tracks.length; 
        return isAlbumInfoLoaded; 
    };

    const getWrappedAlbumItemClassName = () => {
        const marginClass = isCard ? 'm-4': '';
        const cardOrListItem = isCard ? 'card': 'list-item';
        const cardOrListItemClass = `wrapped-album-${cardOrListItem}`;
        const possibleAlbumLoadedClass = getIsAlbumInfoLoaded() ? 'loaded-album-info'
                                                                : '';
        const wrappedAlbumItemClassName = `${marginClass} ${cardOrListItemClass} ${possibleAlbumLoadedClass}`;
        return wrappedAlbumItemClassName;
    };

    const getSpinnerClassName = () => {
        const possibleColourClass = isCard ? 'text-light': '';
        const possibleSizeClass = !isCard ? 'spinner-border-sm': '';
        const spinnerClassName = `spinner-border ${possibleColourClass} ${possibleSizeClass}`;
        return spinnerClassName;
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    
     
    const handleClick = async () => {
        const isAlbumInfoLoaded = getIsAlbumInfoLoaded(); 
        if (isAlbumInfoLoaded) setIsDialogOpen(true);
    };


    return (
        <div className='wrapped-album'>
            <div className={getWrappedAlbumItemClassName()} onClick={handleClick}>
                <div className='spinner-positioner'>
                    <div className={getSpinnerClassName()} role='status'></div>
                </div>         
                {children}
            </div>
            
            {isDialogOpen && (
                <Dialog handleCloseDialog={handleCloseDialog}>
                    <div className='album-intro'>
                        <div className="album-intro-row">
                                <div className='dialog-card-container mx-4'>{card}</div>
                                <div className='extra-album-info-container text-center'>
                                    {getAlbumInfoMessage()}
                                </div>
                        </div>
                    </div>
                    <List
                        channelItems={tracks} 
                        itemInfo={itemInfo} 
                    />
                </Dialog>
            )}
        </div>
    );
};
 
export default WrapAlbum;