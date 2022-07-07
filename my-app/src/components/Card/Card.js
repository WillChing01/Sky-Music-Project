import './Card.css'

const Card = ({ info }) => {
    return (
        <div className="container card">
            <h5>{info.name}</h5>
            <img src={info.imgSrc} alt={info.name}></img>
            <h6>{info.artist}</h6>
            {info.playable && <i class="bi bi-play-fill"></i>}
        </div> 
    );
};

export default Card;