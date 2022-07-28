
import Carousel from '../Carousel/Carousel';
import FavouritesIcon from '../FavouritesIcon/FavouritesIcon';
import PlayIcon from '../PlayIcon/PlayIcon';


import './Card.css';

const Card = ({ itemInfo }) => {
    const { type, name, imgSrc, artist } = itemInfo;

    return (
        // <div className='py-2 px-4 border border-secondary rounded card-view'></div>
        <div className='py-2 px-4 border rounded card-view'>
            <div className='card-top'>
                <Carousel text={itemInfo.name} className='card-title' />
                <span className='region'></span>
                {type === 'track' && <FavouritesIcon trackId={itemInfo.id}/>} 
            </div>
            <img src={imgSrc} alt={name}></img>
            <div className='mt-2 card-bottom'>
                <h6>{artist}</h6>

                {type === 'track' && <PlayIcon itemInfo={itemInfo} />}
            </div>
        </div>
    );
};

export default Card;