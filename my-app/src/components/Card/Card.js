import PlayIcon from '../PlayIcon/PlayIcon';

import './Card.css'

const Card = ({ itemInfo, currentPreviewURL, play, setPlayingInfo}) => {

    return (
        <div className='py-2 px-4 border rounded card-view'>
            <h5>{itemInfo.name}</h5>
            <img src={itemInfo.imgSrc} alt={itemInfo.name}></img>
            <div className='mt-2'>
                <h6>{itemInfo.artist}</h6>
                {itemInfo.playable && <PlayIcon itemInfo={itemInfo} currentPreviewURL={currentPreviewURL} play={play} setPlayingInfo={setPlayingInfo} />}
            </div>
        </div> 
    );
};

export default Card;