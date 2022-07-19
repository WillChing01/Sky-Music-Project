import { useSearchParams } from 'react-router-dom';

import FilterControlPanel from '../FilterControlPanel/FilterControlPanel';
import './SearchBar.css'

const SearchBar = () => {    
    const [searchParams, setSearchParams] = useSearchParams();

    const getInitialSearch = () => {
        return searchParams.get("query") || '';
    }

    const handleSearch = e => {
        e.preventDefault();
        const query = e.target['search-query'].value;
        if (query) setSearchParams({query})
        else setSearchParams({})
    };

    return (    
        <form className='border search-bar' id='form' onSubmit={handleSearch}>
            <input className='m-auto' type='search' name='search-query' placeholder='Search...' autoComplete='off'  defaultValue={getInitialSearch()}/>
            <button type='submit' className='btn btn-sm btn-primary'><i className='bi bi-search'></i></button>
        </form>
    );
}

export default SearchBar;