import { useState, useEffect } from 'react';
import { fetchGenre } from '../../utility/fetchNapster';
import './GenreSelect.css';

const GenreSelect = ({ filter, setFilter }) => {

    // Note: if we really wanted to we could hard-code genre data to avoid another fetch
    const [genres, setGenres] = useState(null);

    const handleSelection = (e) => {
        setFilter({...filter, genre: e.target.value});
    };

    useEffect(() => {
        const getGenres = async () => {
            const { newData: genres } = await fetchGenre();
            setGenres(genres);
        }
        getGenres();
    }, []);

    return (
        <div className='dropdown mb-1'>
            <h6>Genre</h6>
            <select id='genreDropdown' defaultValue={'all'} onChange={handleSelection}>
                <option value={'disabled'} disabled>Choose Genre</option>
                <option value={'all'}>All</option>
                { 
                    genres !== null && genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)
                }
            </select>
        </div>
    );
}
 
export default GenreSelect;