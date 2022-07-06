import { useState, useEffect } from 'react';
import './App.css';
import GridView from './components/GridView/GridView';
import ListView from './components/ListView/ListView';
import Card from "./components/Card/Card"

export const header = {headers: {apikey: 'NzQ2YmQ5NmUtODM2MS00ZDg2LTg4NzMtZGE0ZDExZmViN2U3'}};

function App() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [view, setView] = useState('grid');
  const [channels, setChannels] = useState({albums: true, artists: true, tracks: true})

  useEffect(() => {
    setIsPending(true);
    fetch('https://api.napster.com//v2.2/albums/top?limit=1', header)
    .then(res => {
     setIsPending(false);
     return res.json();
    })
    .then(data => {
      console.log(data);
      setData(data.albums[0]);
    });
  }, []);

  const handleCheckChannel = (e) => {
    const value = e.target.value;
    const newChannels = {...channels};
    newChannels[value] = !channels[value];
    setChannels(newChannels);
  }

  return (
    <div>
      <div>
        <label htmlFor="album">albums</label>
        <input type="checkbox" name="channels" onClick={handleCheckChannel} id="albums" value="albums" defaultChecked={channels.albums}/>
        <label htmlFor="artists">artists</label>
        <input type="checkbox" name="channels" onClick={handleCheckChannel} id="artists" value="artists" defaultChecked={channels.artists}/>
        <label htmlFor="tracks">tracks</label>
        <input type="checkbox" name="channels" onClick={handleCheckChannel} id="tracks" value="tracks" defaultChecked={channels.tracks}/>
      </div>
  


      {data !== null && <Card type={data.type} title={data.name} id={data.id} artistName={data.artistName}></Card>}
      {isPending && 'Loading...'}
      {data !== null && JSON.stringify(data, null, 4)}
      {
      view === 'grid' ?
      <GridView /> :
      <ListView />  
      }
    </div>
  );
}


export default App;
