import { useState } from 'react'
import { fetchAlbumTracks } from '../../utility/fetchNapster' 
import Dialog from '../Dialog/Dialog';
import List from '../List/List'


const WrapAlbum = ({children, info, currentPreviewURL, play, setPlaying}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [tracks, setTracks] = useState([]);

    const handleClick = async () => {
        const { newData } = await fetchAlbumTracks(info.id, 1);
        setTracks(newData);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    
    return (
        <div className='wrap-album'>
            <div className='wrapped-children' onClick={handleClick}>
                {children}
            </div>
            {isDialogOpen && 
            (<Dialog handleCloseDialog={handleCloseDialog}>
                {children}
                <hr/>
                <List 
                    channelItems={tracks} 
                    info={info} 
                    currentPreviewURL={currentPreviewURL} 
                    play={play}
                    setPlaying={setPlaying}
                />
            </Dialog>
            )}
        </div>
    );
};
 
export default WrapAlbum;