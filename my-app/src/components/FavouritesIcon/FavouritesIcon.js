import { useState } from 'react';

import './FavouritesIcon.css'

const FavouritesIcon = ({ trackId }) => {
    const [ favourited, setFavourited ] = useState(false); // will probably be represented elsewhere

    const handleChange = (e) => {
        const form = e.target.parentElement;
        setFavourited(e.target.checked);
        //form.submit();
    }

    const getIconClassName = () => {
        return favourited ? "bi bi-star-fill" : "bi bi-star";;
    }

    return ( // remember this path
        <form action='/' method='POST'>
            <input type='hidden' value={trackId} name='track'/>
            <input className="star-checkbox" id={trackId} type='checkbox' onChange={handleChange} name='favourited' defaultChecked={favourited}/>
            <label className="star-label" htmlFor={trackId}><i className={getIconClassName()}></i></label>
        </form>
    );
}
 
export default FavouritesIcon;