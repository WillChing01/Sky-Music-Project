import { Route, Routes } from 'react-router-dom';

import FavouritesIcon from '../FavouritesIcon/FavouritesIcon';

import LogIn from '../ProfileForms/LogIn/LogIn';
import SignUp from '../ProfileForms/SignUp/SignUp';


const Profile = () => {
    return (
        <div>
            <FavouritesIcon track={{data: 'hello'}} id={1}/>
            <Routes>
                <Route path='login' element={<LogIn />} />
                <Route path='signup' element={<SignUp />} />
                <Route path='id' element={<p>profile</p>} />
            </Routes>
        </div>
    );
}

export default Profile;