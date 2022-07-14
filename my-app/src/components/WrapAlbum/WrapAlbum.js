import { useState } from 'react'
import { fetchAlbumTracks, fetchGenre, fetchArtists } from '../../utility/fetchNapster' 
import Dialog from '../Dialog/Dialog';
import List from '../List/List'


const WrapAlbum = ({children, info, currentPreviewURL, play, setPlaying, filter}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [genres, setGenres] = useState([]);

        

    const handleClick = async () => {
        const { newData: tracks } = await fetchAlbumTracks(info.id, 1);
        const albumGenres = await getAlbumGenres();
        setTracks(tracks);
        setGenres(albumGenres);
        setIsDialogOpen(true);
    };

    const getAlbumGenres = async () => {
        const genresLink = info.genres.href;
        const idsRegex = /\/g\.[0-9g,\.]+/;
        const idsPath = genresLink.match(idsRegex)[0];
        const { newData: genres } = await fetchGenre(idsPath);
        setGenres(genres);
    };

    const listAlbumGenres = () => {
        let listOfGenres = '';
        const numOfGenres = genres.length;
        for (let index = 0; index < numOfGenres; index++) {
            const genre = genres[index];
            const lastGenreIndex = numOfGenres - 1;
            listOfGenres += genre.name;
            if (index !== lastGenreIndex) {
                listOfGenres += ', ';
            }
        }
        return listOfGenres;
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };



    const getFeatures = async () => {
        const featureIdsStr = info.features;
        if (featureIdsStr) {
            const featuredArtists = await fetchArtists(featureIdsStr);
        }
     };
    

    return (
        <div className='wrap-album'>
            <div className='wrapped-children' onClick={handleClick}>
                {children}
            </div>
            {isDialogOpen && 
            (<Dialog handleCloseDialog={handleCloseDialog}>
                <div className='album-intro container'>
                    <div className='row'>
                        <div className='col'>{children}</div>
                        <div className='col extra-album-info'>
                            Genres: 
                            <em>albumName</em> has numTracks tracks. It was released on releaseDate. 
                            // if explicit: It has been rated explicit. 
                            // if features: This track has features from artist names (another fetch...).
                            Copyright: copyright
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