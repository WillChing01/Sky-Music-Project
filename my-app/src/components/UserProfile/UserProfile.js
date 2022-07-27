import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/auth/useLogout";

import './UserProfile.css';

const UserProfile = () => {
    const { logout } = useLogout();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logout();
        navigate('/');
    };

    return (
        <div>
                <i className="bi bi-box-arrow-in-left" onClick={handleLogOut}></i> Log out
                <p>profile</p>
        </div>
    
    );
}
 
export default UserProfile;