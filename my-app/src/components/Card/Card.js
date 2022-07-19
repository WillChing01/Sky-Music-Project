import PlayIcon from '../PlayIcon/PlayIcon';

import './Card.css'

const Card = ({ itemInfo }) => {

    return (
        <div className='py-2 px-4 border rounded card-view'>
            <h5>{itemInfo.name}</h5>
            <img src={itemInfo.imgSrc} alt={itemInfo.name}></img>
            <div className='mt-2'>
                <h6>{itemInfo.artist}</h6>
                {itemInfo.playable && <PlayIcon itemInfo={itemInfo} />}
            </div>
        </div> 
    );
};

export default Card;