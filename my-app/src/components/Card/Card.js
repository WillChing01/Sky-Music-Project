import { useState, useEffect } from 'react';

const Card = ({ type, id, title, artistName, albumId }) => {
    // artists, songs (tracks), albums

    const generateImageReq = () => {
        const imgFetchType = type === 'track' ? 'album': type;
        const imgFetchId = type === 'track' ? albumId: id;
        const size = type === 'artist' ? '633x422': '500x500';
        return `https://api.napster.com/imageserver/v2/${imgFetchType + 's'}/${imgFetchId}/images/${size}.jpg`;
    };

    return (
        <div className="container">
            <h5>{title}</h5>
            <img src={generateImageReq()} alt={title}></img>
            
        </div>      
    );
};
 
export default Card;