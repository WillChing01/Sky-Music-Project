import { useState, useEffect } from 'react';
import { fetchGenre } from '../../utility/fetchNapster';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../state/slices/filterSlice';

import './GenreSelect.css';

const GenreSelect = ({}) => {
    const [genres, setGenres] = useState(null);

    const dispatch = useDispatch();

    const handleSelection = (e) => {
        const genre = e.target.value;
        dispatch(setFilter({genre}));
    };

    useEffect(() => {
        const getGenres = async () => {
            const { newData: genres } = await fetchGenre();
            setGenres(genres);
        };
        getGenres();
    }, []);
    
    const getGenreOptions = () => {
        const areGenresLoaded = genres !== null;
        if (areGenresLoaded) {
            return genres.map(genre => 
                <option key={genre.id} value={genre.id}>{genre.name}</option>
            );
        }
    };

    return (
        <div className='dropdown mb-1'>
            <h6>Genre</h6>
            <select id='genreDropdown' defaultValue='all' onChange={handleSelection}>
                <option value='disabled' disabled>Choose Genre</option>
                <option value='all'>All</option>
                {getGenreOptions()}
            </select>
        </div>
    );
}
 
export default GenreSelect;