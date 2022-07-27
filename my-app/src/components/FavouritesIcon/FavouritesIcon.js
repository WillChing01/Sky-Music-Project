import { useState } from 'react';

import './FavouritesIcon.css'

const FavouritesIcon = ({ track, id }) => {

    const [ favourited, setFavourited ] = useState(false); // will probably be represented elsewhere

    const handleChange = (e) => {
        const form = e.target.parentElement;
        setFavourited(e.target.checked);
        //form.submit();
    }

    const getIconClassName = () => {
        return favourited ? "bi bi-star-fill" : "bi bi-star";;
    }

    return (
        <form action='/' method='POST'>
            <input type='hidden' value={track} name='track'/>
            <label className="star-label" htmlFor={id}><i className={getIconClassName()}></i></label>
            <input className="star" id={id} type='checkbox' onChange={handleChange} name='favourited' defaultChecked={favourited}/>
        </form>
    );
}
 
export default FavouritesIcon;