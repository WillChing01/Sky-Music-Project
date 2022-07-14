import './ChannelSelect.css';

const ChannelSelect = ({filter, setFilter}) => {
    
    const handleCheckChannel = (e) => {
        const channel = e.target.value;
        const newChannels = {...(filter.channelsOpen)};
        newChannels[channel] = !filter.channelsOpen[channel];
        setFilter({...filter, channelsOpen: newChannels});
    };

    return (
        <div>
            <h6>Channels</h6>
            <label htmlFor="tracks" className='checkbox p-1 mb-1'>Tracks
                <span></span>
                <input type="checkbox" name="channels" onClick={handleCheckChannel} id="tracks" value="tracks" defaultChecked={filter.channelsOpen.tracks}/>
            </label>
            <label htmlFor="albums" className='checkbox p-1 mb-1'>Albums
                <span></span>
                <input type="checkbox" name="channels" onClick={handleCheckChannel} id="albums" value="albums" defaultChecked={filter.channelsOpen.albums}/>
            </label>
            <label htmlFor="artists" className='checkbox p-1 mb-1'>Artists
                <span></span>
                <input type="checkbox" name="channels" onClick={handleCheckChannel} id="artists" value="artists" defaultChecked={filter.channelsOpen.artists}/>
            </label>
      </div>
    );
}
 
export default ChannelSelect;