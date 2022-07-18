import { useDispatch, useSelector } from 'react-redux';
import { toggleChannelOpen } from '../../state/slices/filterSlice';
import './ChannelSelect.css';


const ChannelSelect = ({}) => {
    const channelsOpen = useSelector((state) => state.filter.channelsOpen);
    const dispatch = useDispatch();
    
    const handleCheckChannel = (e) => {
        const channel = e.target.value;
        dispatch(toggleChannelOpen(channel));
    };

    return (
        <div>
            <h6>Channels</h6>
            <label htmlFor="tracks" className='checkbox p-1 mb-1'>Tracks
                <span></span>
                <input type="checkbox" name="channels" onClick={handleCheckChannel} id="tracks" value="tracks" defaultChecked={channelsOpen.tracks}/>
            </label>
            <label htmlFor="albums" className='checkbox p-1 mb-1'>Albums
                <span></span>
                <input type="checkbox" name="channels" onClick={handleCheckChannel} id="albums" value="albums" defaultChecked={channelsOpen.albums}/>
            </label>
            <label htmlFor="artists" className='checkbox p-1 mb-1'>Artists
                <span></span>
                <input type="checkbox" name="channels" onClick={handleCheckChannel} id="artists" value="artists" defaultChecked={channelsOpen.artists}/>
            </label>
      </div>
    );
}
 
export default ChannelSelect;