import { Route, Routes } from 'react-router-dom';
import LogIn from '../LogIn/LogIn';
import SignUp from '../SignUp/SignUp';

const Profile = () => {
    return (
        <div>
            Profile
            <Routes>
                <Route path='/login/*' element={<LogIn />} />
                <Route path='/signup/*' element={<SignUp />} />
                {/* <Route path='/:id' element={<SignUp />} /> */}
            </Routes>
        </div>
    );
}

export default Profile;