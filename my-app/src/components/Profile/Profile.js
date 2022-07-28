import { Route, Routes, useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

import FavouritesList from '../FavouritesList/FavouritesList';

import LogIn from '../ProfileForms/LogIn/LogIn';
import SignUp from '../ProfileForms/SignUp/SignUp';
import UserProfile from '../UserProfile/UserProfile';

const Profile = () => {
    const { user } = useAuthContext();
    
    return (
        <div className='space'>
            <Routes>
                <Route path='/login' element={<LogIn />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/favourites' element={<FavouritesList />} />
                <Route path='/user/:username' element={user && <UserProfile user={user} />} />
            </Routes>
        </div>
    );
}

export default Profile;