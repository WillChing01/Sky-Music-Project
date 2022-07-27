import useFetch from '../../hooks/useFetch';
import { getArtistsInfo } from '../../utility/fetchNapster';
import ArtistSnippet from '../ArtistSnippet/ArtistSnippet';
import FlipWrap from '../FlipWrap/FlipWrap';

import './WrapArtist.css'

const apikey = process.env.REACT_APP_NAPSTER_API_KEY;

const WrapArtist = ({children, itemInfo}) => {
    const { id, name } = itemInfo;
    const fetchOptions = {headers: { apikey }}
    const artists = useFetch(...getArtistsInfo([id]), [], fetchOptions);


    const getArtistBios = () => {
        if (artists.items.length) {
            const artist = artists.items[0];
            const bios = [];
            for (let i = 0; i < 3; i++) {
                const bio = artist.blurbs[i];
                if (bio) bios.push(bio);
            }
            if (bios.length) return bios;
        }
        return null;
    };

    return (
        <div className='wrapped-artist m-4'>
            {
            getArtistBios() ? <FlipWrap 
                                front={children}
                                back={<ArtistSnippet name={name} bios={getArtistBios()}/>}
                                />
                            : children
            }
        </div>
    );
};
 
export default WrapArtist;