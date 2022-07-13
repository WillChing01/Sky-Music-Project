// const ChannelSelect = ({setChannelsOpen, channelsOpen}) => {
    
//     const handleCheckChannel = (e) => {
//         const channel = e.target.value;
//         const newChannels = {...channelsOpen};
//         newChannels[channel] = !channelsOpen[channel];
//         setChannelsOpen(newChannels);
//     };

//     return (
//         <div>
//             <label htmlFor="tracks">Tracks</label>
//             <input type="checkbox" name="channels" onClick={handleCheckChannel} id="tracks" value="tracks" defaultChecked={channelsOpen.tracks}/>
//             <label htmlFor="album">Albums</label>
//             <input type="checkbox" name="channels" onClick={handleCheckChannel} id="albums" value="albums" defaultChecked={channelsOpen.albums}/>
//             <label htmlFor="artists">Artists</label>
//             <input type="checkbox" name="channels" onClick={handleCheckChannel} id="artists" value="artists" defaultChecked={channelsOpen.artists}/>
//       </div>
//     );
// }
 
// export default ChannelSelect;

const ChannelSelect = ({filter, setFilter}) => {
    
    const handleCheckChannel = (e) => {
        const channel = e.target.value;
        const newChannels = {...(filter.channelsOpen)};
        newChannels[channel] = !filter.channelsOpen[channel];
        setFilter({...filter, channelsOpen: newChannels});
    };

    return (
        <div>
            <label htmlFor="tracks">Tracks</label>
            <input type="checkbox" name="channels" onClick={handleCheckChannel} id="tracks" value="tracks" defaultChecked={filter.channelsOpen.tracks}/>
            <label htmlFor="album">Albums</label>
            <input type="checkbox" name="channels" onClick={handleCheckChannel} id="albums" value="albums" defaultChecked={filter.channelsOpen.albums}/>
            <label htmlFor="artists">Artists</label>
            <input type="checkbox" name="channels" onClick={handleCheckChannel} id="artists" value="artists" defaultChecked={filter.channelsOpen.artists}/>
      </div>
    );
}
 
export default ChannelSelect;