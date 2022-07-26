import useFetch from '../../hooks/useFetch';
import { getArtistsInfo } from '../../utility/fetchNapster';
import ArtistSnippet from '../ArtistSnippet/ArtistSnippet';
import FlipWrap from '../FlipWrap/FlipWrap';

import './WrapArtist.css'

const WrapArtist = ({children, itemInfo}) => {
    const { id, name } = itemInfo;
    const artists = useFetch(...getArtistsInfo([id]), [])

    const getArtistBio = () => {
        if (artists.data) {
            const artist = artists.data[0];
            const bio = artist.bios.bio;
            return bio;
        } else return null;
    };

    return (
        <div className='wrapped-artist m-4'>
            {
            getArtistBio() ? <FlipWrap 
                                front={children}
                                back={<ArtistSnippet name={name} bio={getArtistBio()}/>}
                                />
                            : children
            }
        </div>
    );
};
 
export default WrapArtist;