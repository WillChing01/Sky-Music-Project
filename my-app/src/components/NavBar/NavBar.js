import SearchBar from "../SearchBar/SearchBar";
import FilterControlPanel from "../FilterControlPanel/FilterControlPanel";
import ViewSelect from "../ViewSelect/ViewSelect";
import './NavBar.css';

const NavBar = ({ view, setView, searchParams, setSearchParams, filter, setFilter }) => {
    return (
        <div className='topscreen'>
            <ViewSelect view={view} setView={setView}/>
            <div className="region"></div>
            <div className='bar'>
                <FilterControlPanel filter={filter} setFilter={setFilter}/>
                <SearchBar initialSearch={searchParams.get("query") || ''} setSearchParams={setSearchParams}/>
            </div>
        </div>
    );
}
 
export default NavBar;