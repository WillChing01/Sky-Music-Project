import { useEffect, useState } from 'react'
import { fetchAlbumTracks, fetchGenre, fetchArtists } from '../../utility/fetchNapster' 
import { listArrOfStrsAsStr } from '../../utility/formatArr';

import Dialog from '../Dialog/Dialog';
import List from '../List/List'

import './WrapAlbum.css'

const WrapAlbum = ({children, info, currentPreviewURL, play, setPlaying, filter}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
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
        const { newData: albumTracks } = await fetchAlbumTracks(info.id, 1);
        return albumTracks;
    };

    const getAlbumGenres = async () => {
        const genresIds = info.genres;
        const genreList = listArrOfStrsAsStr(genresIds, ',');
        const { newData: genres } = await fetchGenre(genreList);
        return genres;
    };

    const getAlbumFeatures = async () => {
        const featuresIdStr = info.features;
        const defaultFeatures = [];
        if (featuresIdStr) {
            const featuredArtists = await fetchArtists(featuresIdStr);
            return featuredArtists;
        } 
        return defaultFeatures;
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
                <strong>{info.name}</strong> has {info.numTracks} tracks. 
            </span>
        );
    }

    const getReleaseMessage = () => {
        return (
            <span> 
                &nbsp;It was released on <em>{info.releaseDate}</em>.
            </span>
        );
    };

    const getIsExplicitMessage = () => {
        const defaultExplicitMsg = '';
        if (info.isExplicit) { 
            const explicitMsg = (
                                    <span>
                                    &nbsp;It has been rated <em>explicit</em>.
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
                                    &nbsp;The album has features from {featuresListStr}.
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
                                     &nbsp;<strong>Genres:</strong> {genresListStr}
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
        <p>
            {numTracksMessage}
            {releaseMessage}
            {isExplicitMessage}
            {featuresMessage}
            <br/>
            <br/>
            {genresMessage}
        </p>
        );
    };


    const getIsAlbumInfoLoaded = () => {
        const isAlbumInfoLoaded = !!tracks.length; 
        return isAlbumInfoLoaded; 
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
            <div className={`wrapped-album-card ${getIsAlbumInfoLoaded() && 'loaded-album-info'}`} onClick={handleClick}>
                <div className='spinner-centraliser'>
                    <div className='spinner-border text-light' role='status'></div>
                </div>
                {children}
            </div>
            
            {isDialogOpen && 
            (<Dialog handleCloseDialog={handleCloseDialog}>
                <div className='album-intro'>
                   <div className="album-intro-row">
                         <div className='dialog-card-container'>{children}</div>
                         <div className='extra-album-info'>
                           {getAlbumInfoMessage()}
                        </div>
                   </div>
                </div>
                <List 
                    filter={filter}
                    channelItems={tracks} 
                    info={info} 
                    currentPreviewURL={currentPreviewURL} 
                    play={play}
                    setPlaying={setPlaying}
                />
            </Dialog>
            )
            }
        </div>
    );
};
 
export default WrapAlbum;