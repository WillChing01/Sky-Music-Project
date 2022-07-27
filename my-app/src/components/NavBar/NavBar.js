import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from "../SearchBar/SearchBar";
import FilterControlPanel from "../FilterControlPanel/FilterControlPanel";
import ViewSelect from "../ViewSelect/ViewSelect";

import './NavBar.css';

const NavBar = () => {
    const isLoggedIn = useSelector((state) => state.profileInfo.isLoggedIn);

    const getProfilePath = () => {
        if (isLoggedIn) return '/profile/favourites'; // TODO temp
        else return '/profile/login';
    }

    const toggleDarkMode = () => {
        const isDark = document.documentElement.className === 'dark-mode-filter';
        console.log(document.documentElement)
        if (isDark) {
            document.documentElement.className = '';
        } else {
            document.documentElement.className = 'dark-mode-filter';
        }
    }

    return (
        <div className='topscreen'>
            <Link className='nav-link' to='/'><i className="bi bi-house nav-icon border ms-2 me-2"></i></Link>
            <ViewSelect/>
            {<input type='checkbox' onClick={toggleDarkMode}/>}
            <i className='bi bi-sun' />
            <div className="region"></div>
            <div className='bar'>
                <FilterControlPanel/>
                <SearchBar />
            </div>
            <Link className='nav-link' to={getProfilePath()}><i className="bi bi-person nav-icon border ms-2 me-2"></i></Link>
        </div>
    );
}
 
export default NavBar;