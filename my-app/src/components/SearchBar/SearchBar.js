import FilterControlPanel from '../FilterControlPanel/FilterControlPanel';
import './SearchBar.css'

const SearchBar = ({ initialSearch, setSearchParams, filter, setFilter }) => {
    
    const handleSearch = e => {
        e.preventDefault();
        const query = e.target['search-query'].value;
        if (query) setSearchParams({query})
        else setSearchParams({})
    };

    return (
        <div className='bar'>
            <FilterControlPanel filter={filter} setFilter={setFilter}/>
            <form className='border search-bar' id='form' onSubmit={handleSearch}>
                <input className='m-auto' type='search' name='search-query' placeholder='Search...' autoComplete='off'  defaultValue={initialSearch}/>
                <button type='submit' className='btn btn-sm btn-primary'><i className='bi bi-search'></i></button>
            </form>
        </div>
        
    );
}

export default SearchBar;