import { useState, useEffect } from 'react';
import { fetchGenre } from '../../utility/fetchNapster';
import './GenreSelect.css';

const GenreSelect = ({ filter, setFilter }) => {

    // Note: if we really wanted to we could hard-code genre data to avoid another fetch
    const [genres, setGenres] = useState(null);

    const handleSelection = (e) => {
        setFilter({...filter, genre: e.target.value});
    }

    useEffect(() => {
        const getGenres = async () => {
            const genres = await fetchGenre();
            setGenres(genres['newData']);
        }
        getGenres();
    }, []);

    return (
        <div className='dropdown'>
            <select defaultValue={'default'} onChange={handleSelection}>
                <option value={'default'} disabled hidden>Choose Genre</option>
                { 
                    genres !== null && genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)
                }
            </select>
        </div>
    );
}
 
export default GenreSelect;