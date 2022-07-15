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

    const getAlbumGenresIds = () => {
        return info.genres;
    }

    const getAlbumGenres = async () => {
        const genresIds = getAlbumGenresIds() 
        const genreList = listArrOfStrsAsStr(genresIds, ',');
        const { newData: genres } = await fetchGenre(genreList);
        return genres
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
        const genresStrList = listArrOfStrsAsStr(genreNames);
        return genresStrList;
    };

    const listFeaturedArtists = () => {
        const featuresStrList = listArrOfStrsAsStr(features);
        return featuresStrList;
    };

    const getIsExplicitMessage = () => {
        if (info.isExplicit) return 'It has been rated explicit.';
        else return '';
    }


    const getAlbumInfoMessage = () => {
        const numTracksMessage = `${info.name} has ${info.numTracks}.` 
        const isExplicitMessage = getIsExplicitMessage();
        const releaseMessage = `It was released on ${info.releaseDate}.`
        // <em>{info.name}</em> has {info.numTracks}. It was released on {info.releaseDate}. 
        // {getIsExplicitMessage()}. {getFeaturesMessage()}
        // Copyright: copyright
        // Genres: {listAlbumGenres()}
    }


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
                <div className='album-intro container'>
                    <div className='row album-intro-row'>
                        <div className='col'>{children}</div>
                        <div className='col extra-album-info'>
                           
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