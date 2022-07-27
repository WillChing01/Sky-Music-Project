import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavouriteTrack } from '../../state/slices/profileInfo/profileInfoSlice';

import './FavouritesIcon.css'

const FavouritesIcon = ({ trackId, prefix }) => {
    const id = `${prefix}-${trackId}`;

    const favourited = useSelector((state) => {
        const favourites = state.profileInfo.favourites;
        return favourites.includes(trackId);
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const form = e.target.parentElement;
        dispatch(toggleFavouriteTrack({id: trackId}));
        //form.submit();
    }

    const getIconClassName = () => {
        return favourited ? "bi bi-star-fill gold" : "bi bi-star";;
    }

    return ( // remember this path
        <form action='/' method='POST'>
            <input type='hidden' value={trackId} name='track'/>
            <input className="star-checkbox" id={id} type='checkbox' onChange={handleChange} name='favourited' defaultChecked={favourited}/>
            <label className="star-label" htmlFor={id}><i className={getIconClassName()}></i></label>
        </form>
    );
}
 
export default FavouritesIcon;