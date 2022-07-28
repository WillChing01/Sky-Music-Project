import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useLogout } from '../../hooks/auth/useLogout';
import useFetch from '../../hooks/useFetch';
import { setFavourites } from '../../state/slices/profileInfo/profileInfoSlice';
import { getIsFetchResolved } from '../../utility/fetchNapster';

import FavouritesList from '../FavouritesList/FavouritesList';

import './UserProfile.css';

const getFavouritesFetchInfo = (username) => {
    const fetchURL = `/api/profile/user/favourites/${username}`;
    const fetchKeys = ['favourites'];
    return [fetchURL, fetchKeys];
};

const getProfileFetchOptions = (token) => {
    const fetchOptions = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return fetchOptions;
};

const UserProfile = ({ user }) => {
    const { username } = useParams();
    const { logout } = useLogout();
    
    const dispatch = useDispatch();
    
    const favourites = useFetch(...getFavouritesFetchInfo(user.username), [], getProfileFetchOptions(user.token)); 
    const { items, error, pendingMsg } = favourites;

    const navigate = useNavigate();

    const handleLogOut = () => {
        logout();
        const favouritesList = { favourites: [] };
        dispatch(setFavourites(favouritesList));
        navigate('/');
    };

    useEffect(() => {
        if (username !== user.username) navigate('/');
    }, []);

    useEffect(() => {
        if (items[0] !== null) {
            const favouritesList = { favourites: items };
            dispatch(setFavourites(favouritesList));
        }
    }, [JSON.stringify(items)]);

    const getFavouritesView = () => {
        if (pendingMsg) {
            return <div className='indent'>Grabbing favourites...</div>;
        } else {
            const gotFavourites = getIsFetchResolved(favourites); 
            return gotFavourites && !error.statusCode && <FavouritesList />;
        }
    };

    return (
        <div>
            <div className='to-right'>
                <button className="btn btn-primary" onClick={handleLogOut}>Log out</button>
            </div>
            {username === user.username && getFavouritesView()}
        </div>
    );
}
 
export default UserProfile;