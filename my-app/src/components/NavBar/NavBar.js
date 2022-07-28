import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import SearchBar from "../SearchBar/SearchBar";
import FilterControlPanel from "../FilterControlPanel/FilterControlPanel";
import ViewSelect from "../ViewSelect/ViewSelect";
import ColourScheme from '../ColourScheme/ColourScheme';

import './NavBar.css';

const NavBar = () => {
    const { user } = useAuthContext();

    const getProfilePath = () => {
        if (user) return `profile/user/${user.username}`
        else return '/profile/login'
    };

    return (
        <div className='topscreen'>
            <Link className='nav-link' to='/'><i className='bi bi-house nav-icon border ms-2 me-2'></i></Link>
            <ViewSelect/>
            <ColourScheme/>
            <div className="region"></div>
            <div className='bar'>
                <FilterControlPanel/>
                <SearchBar />
            </div>
            <Link className='nav-link' to={getProfilePath()}><i className='bi bi-person nav-icon border ms-2 me-2'></i></Link>
        </div>
    );
}
 
export default NavBar;