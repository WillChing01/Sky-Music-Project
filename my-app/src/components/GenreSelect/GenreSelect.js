import { useState, useEffect } from 'react';
import { fetchGenre } from '../../utility/fetchNapster';
import { useSelector, useDispatch } from 'react-redux';
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