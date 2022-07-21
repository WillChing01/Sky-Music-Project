import { useState, useEffect } from 'react';
import { fetchGenre } from '../../utility/fetchNapster';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../state/slices/filterSlice';

import './GenreSelect.css';

const genres = [
  {
    "id": "g.115",
    "name": "Pop"
  },
  {
    "id": "g.5",
    "name": "Rock"
  },
  {
    "id": "g.33",
    "name": "Alternative"
  },
  {
    "id": "g.146",
    "name": "Hip-Hop"
  },
  {
    "id": "g.194",
    "name": "R&B/Soul"
  },
  {
    "id": "g.407",
    "name": "Country"
  },
  {
    "id": "g.299",
    "name": "Jazz"
  },
  {
    "id": "g.71",
    "name": "Dance/Electronica"
  },
  {
    "id": "g.510",
    "name": "Latin"
  },
  {
    "id": "g.488",
    "name": "World"
  },
  {
    "id": "g.383",
    "name": "Reggae"
  },
  {
    "id": "g.21",
    "name": "Classical"
  },
  {
    "id": "g.4",
    "name": "Oldies"
  },
  {
    "id": "g.453",
    "name": "New Age"
  },
  {
    "id": "g.75",
    "name": "Christian/Gospel"
  },
  {
    "id": "g.438",
    "name": "Blues"
  },
  {
    "id": "g.446",
    "name": "Folk"
  },
  {
    "id": "g.69",
    "name": "Easy Listening"
  },
  {
    "id": "g.246",
    "name": "Soundtracks"
  },
  {
    "id": "g.470",
    "name": "Children"
  },
  {
    "id": "g.156",
    "name": "Comedy/Spoken Word"
  },
  {
    "id": "g.394",
    "name": "Metal"
  }
];

const GenreSelect = () => {
    const dispatch = useDispatch();

    const handleSelection = (e) => {
        const genre = e.target.value;
        dispatch(setFilter({genre}));
    };

    const getGenreOptions = () => {
        return genres.map(genre => 
            <option key={genre.id} value={genre.id}>{genre.name}</option>
        );
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
