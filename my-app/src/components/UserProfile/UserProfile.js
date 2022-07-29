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
    const isRightUser = username === user.username; 
    
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
        if (!isRightUser) navigate('/');
    }, []);

    useEffect(() => {
        const hasFavourites = items[0] !== null;
        if (hasFavourites) {
            const favouritesList = { favourites: items };
            dispatch(setFavourites(favouritesList));
        };
    }, [JSON.stringify(items)]);

    const getFavouritesView = () => {
        if (pendingMsg) {
            return <div className='indent'>Grabbing favourites...</div>;
        } else {
            const isFavsFetchResolved = getIsFetchResolved(favourites);
            const isErrorFree = !error.statusCode;
            const canShowFavs = isFavsFetchResolved && isErrorFree; 
            return canShowFavs && <FavouritesList />;
        }
    };

    return (
        <div>
            <div className='to-right'>
                <button className="btn btn-primary" onClick={handleLogOut}>Log out</button>
            </div>
            {isRightUser && getFavouritesView()}
        </div>
    );
}
 
export default UserProfile;