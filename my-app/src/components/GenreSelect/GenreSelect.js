import { useState, useEffect } from 'react';
import { fetchGenre } from '../../utility/fetchNapster';
import './GenreSelect.css';

const GenreSelect = () => {

    // Note: if we really wanted to we could hard-code genre data to avoid another fetch
    const [genres, setGenres] = useState(null);

    useEffect(() => {
        const getGenres = async () => {
            const genres = await fetchGenre();
            setGenres(genres['newData']);
        }
        getGenres();
    }, []);

    return (
        <form className='dropdown'>
            <select defaultValue={'default'}>
                <option value={'default'} disabled hidden>Choose Genre</option>
                { 
                    genres !== null && genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)
                }
            </select>
        </form>
    );
}
 
export default GenreSelect;