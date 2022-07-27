import { Route, Routes } from 'react-router-dom';

import FavouritesIcon from '../FavouritesIcon/FavouritesIcon';

import LogIn from '../ProfileForms/LogIn/LogIn';
import SignUp from '../ProfileForms/SignUp/SignUp';
import UserProfile from '../UserProfile/UserProfile';


const Profile = () => {
    return (
        <div>
            <Routes>
                <Route path='/login' element={<LogIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/:id' element={<UserProfile />} />
            </Routes>
        </div>
    );
}

export default Profile;