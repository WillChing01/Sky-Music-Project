import { useState } from 'react'
import useFetch from '../../hooks/useFetch';
import { getAlbumTracksInfo, getGenresInfo } from '../../utility/fetchNapster' 
import { listArrOfStrsAsStr } from '../../utility/format/formatArr';

import Dialog from '../Dialog/Dialog';
import List from '../List/List'

import './WrapAlbum.css'
import explicitIcon from '../../svg/explicit.svg';

const WrapAlbum = ({children, card, itemInfo, isCard}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const tracks = useFetch(...getAlbumTracksInfo(itemInfo.id), []);
    const genres = useFetch(...getGenresInfo(itemInfo.genres), []);

    const listAlbumGenres = () => {
        const genreNames = genres.items.map(genre => genre.name);
        const genresStrList = listArrOfStrsAsStr(genreNames, ', ');
        return genresStrList;
    };

    const getNumTracksMessage = () => {
        return (
            <span>
                <strong>{itemInfo.name}</strong> has <strong>{itemInfo.numTracks} tracks</strong>. 
            </span>
        );
    };

    const getReleaseMessage = () => {
        return (
            <span> 
                &nbsp;It was released on <em>{itemInfo.releaseDate}</em>.
            </span>
        );
    };

    const getIsExplicitMessage = () => {
        const defaultExplicitMsg = '';
        if (itemInfo.isExplicit) { 
            const explicitMsg = (
                <span>
                &nbsp; The album has been rated <strong>explicit</strong> {explicitIcon}.
                </span>
            );
            return explicitMsg;
        } else return defaultExplicitMsg;
    };

    const getGenresMessage = () => {
        const defaultGenresMsg = '';
        const genresListStr = listAlbumGenres();
        if (genresListStr) {
            const genresMsg = (
                <span>
                    &nbsp;Album <strong>genres:</strong> <em>{genresListStr}</em>.
                </span>
            ); 
            return genresMsg;
        } else return defaultGenresMsg;
    };


    const getAlbumInfoMessage = () => {
        const numTracksMessage = getNumTracksMessage();
        const releaseMessage = getReleaseMessage();
        const isExplicitMessage = getIsExplicitMessage();
        const genresMessage = getGenresMessage();

        return (
        <div className='album-info-msg mb-1 p-3'>
            {numTracksMessage}
            {releaseMessage}
            {isExplicitMessage}
            {genresMessage}
        </div>
        );
    };

    const getIsAlbumInfoLoaded = () => {
        const isAlbumInfoLoaded = !!tracks.items.length; 
        return isAlbumInfoLoaded; 
    };

    const getWrappedAlbumItemClassName = () => {
        const marginClass = isCard ? 'm-4': '';
        const cardOrListItem = isCard ? 'card': 'list-item';
        const cardOrListItemClass = `wrapped-album-${cardOrListItem}`;
        const possibleAlbumLoadedClass = getIsAlbumInfoLoaded() ? 'loaded-album-info'
                                                                : '';
        const wrappedAlbumItemClassName = `${marginClass} ${cardOrListItemClass} ${possibleAlbumLoadedClass}`;
        return wrappedAlbumItemClassName;
    };

    const getSpinnerClassName = () => {
        const possibleColourClass = isCard ? 'text-light': '';
        const possibleSizeClass = !isCard ? 'spinner-border-sm': '';
        const spinnerClassName = `spinner-border ${possibleColourClass} ${possibleSizeClass}`;
        return spinnerClassName;
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    
     
    const handleClick = async () => {
        const isAlbumInfoLoaded = getIsAlbumInfoLoaded(); 
        if (isAlbumInfoLoaded) setIsDialogOpen(true);
    };


    return (
        <div className='wrapped-album'>
            <div className={getWrappedAlbumItemClassName()} onClick={handleClick}>
                <div className='spinner-positioner'>
                    <div className={getSpinnerClassName()} role='status'></div>
                </div>         
                {children}
            </div>
            
            {isDialogOpen && (
                <Dialog handleCloseDialog={handleCloseDialog}>
                    <div className='album-intro'>
                        <div className="album-intro-row">
                                <div className='dialog-card-container mx-4'>{card}</div>
                                <div className='extra-album-info-container text-center'>
                                    {getAlbumInfoMessage()}
                                </div>
                        </div>
                    </div>
                    <List
                        channelItems={tracks.items} 
                        itemInfo={itemInfo} 
                    />
                </Dialog>
            )}
        </div>
    );
};
 
export default WrapAlbum;