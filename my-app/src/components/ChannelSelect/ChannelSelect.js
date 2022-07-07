const ChannelSelect = ({setChannelsOpen, channelsOpen}) => {
    
    const handleCheckChannel = (e) => {
        const value = e.target.value;
        const newChannels = {...channelsOpen};
        newChannels[value] = !channelsOpen[value];
        setChannelsOpen(newChannels);
    };

    return (
        <div>
            <label htmlFor="tracks">tracks</label>
            <input type="checkbox" name="channels" onClick={handleCheckChannel} id="tracks" value="tracks" defaultChecked={channelsOpen.tracks}/>
            <label htmlFor="album">albums</label>
            <input type="checkbox" name="channels" onClick={handleCheckChannel} id="albums" value="albums" defaultChecked={channelsOpen.albums}/>
            <label htmlFor="artists">artists</label>
            <input type="checkbox" name="channels" onClick={handleCheckChannel} id="artists" value="artists" defaultChecked={channelsOpen.artists}/>
      </div>
    );
}
 
export default ChannelSelect;