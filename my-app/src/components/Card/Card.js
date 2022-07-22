import PlayIcon from '../PlayIcon/PlayIcon';
import ScrollText from '../ScrollText/ScrollText';

import './Card.css';

const Card = ({ itemInfo }) => {
    //<h5 className='elem'><ScrollText message={itemInfo.name} containerId={itemInfo.name} /></h5>
    return (
        <div className='py-2 px-4 border rounded card-view'>
            <h5 className='elem'>{itemInfo.name}</h5>
            <img src={itemInfo.imgSrc} alt={itemInfo.name}></img>
            <div className='mt-2'>
                <h6>{itemInfo.artist}</h6>
                {itemInfo.playable && <PlayIcon itemInfo={itemInfo} />}
            </div>
        </div>
    );
};

export default Card;