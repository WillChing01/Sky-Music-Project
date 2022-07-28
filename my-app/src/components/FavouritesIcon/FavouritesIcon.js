import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '../../hooks/useAuthContext';
import { toggleFavouriteTrack } from '../../state/slices/profileInfo/profileInfoSlice';

import './FavouritesIcon.css'

const FavouritesIcon = ({ trackId, prefix }) => {
    const { user } = useAuthContext(); 
    const id = `${prefix}-${trackId}`;

    const favourited = useSelector((state) => {
        const favourites = state.profileInfo.favourites;
        return favourites.includes(trackId);
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        
        const favourited = e.target.checked;
        const username = user.username;
        
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ favourited, trackId, username })
        }

        fetch(`/api/profile/user/${user.username}`, fetchOptions)
        .then((res) => res.json())
        .then((data) => console.log(data));
        dispatch(toggleFavouriteTrack({id: trackId}));
    }

    const getIconClassName = () => {
        const isDark = document.documentElement.className === 'dark-mode-filter';
        if (isDark) {
            return favourited ? "bi bi-star-fill gold inversion" : "bi bi-star";
        }
        else {
            return favourited ? "bi bi-star-fill gold" : "bi bi-star";
        }
    }

    return (
        <form>
            <input className="star-checkbox" id={id} type='checkbox' onChange={handleChange} name='favourited' defaultChecked={favourited}/>
            <label className="star-label" htmlFor={id}><i className={getIconClassName()}></i></label>
        </form>
    );
}
 
export default FavouritesIcon;