import { Link } from 'react-router-dom'
import SearchBar from "../SearchBar/SearchBar";
import FilterControlPanel from "../FilterControlPanel/FilterControlPanel";
import ViewSelect from "../ViewSelect/ViewSelect";

import './NavBar.css';

const NavBar = ({}) => {
    return (
        <div className='topscreen'>
            <Link className='nav-link' to='/'><i className="bi bi-house nav-icon border ms-2 me-2"></i></Link>
            <ViewSelect/>
            <div className="region"></div>
            <div className='bar'>
                <FilterControlPanel/>
                <SearchBar />
            </div>
            <Link className='nav-link' to='/profile'><i className="bi bi-person nav-icon border ms-2 me-2"></i></Link>
        </div>
    );
}
 
export default NavBar;