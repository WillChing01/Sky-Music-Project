
import Carousel from '../Carousel/Carousel';
import PlayIcon from '../PlayIcon/PlayIcon';
import ScrollText from '../ScrollText/ScrollText';

import './Card.css';

const Card = ({ itemInfo }) => {
    const { type, name, imgSrc, artist } = itemInfo;
    //<h5 className='elem'><ScrollText message={itemInfo.name} containerId={itemInfo.name} /></h5>
    return (
        <div className='py-2 px-4 border border-dark rounded card-view'>
            {/* <h5 className='elem'>{name}</h5> */}
            <Carousel text={itemInfo.name} className='card-title' />
            <img src={imgSrc} alt={name}></img>
            <div className='mt-2'>
                <h6>{artist}</h6>
                {type === 'track' && <PlayIcon itemInfo={itemInfo} />}
            </div>
        </div>
    );
};

export default Card;