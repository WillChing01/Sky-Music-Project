// import { useState, useEffect } from 'react';
// import './App.css';
// import GridView from './components/GridView/GridView';
// import ListView from './components/ListView/ListView';
// import Card from "./components/Card/Card";
// import ChannelSelect from './components/ChannelSelect/ChannelSelect';
// import List from "./components/List/List"
// import ViewSelect from './components/ViewSelect/ViewSelect';
// import SearchBar from './components/SearchBar/SearchBar';
// import ViewContainer from './components/ViewContainer/ViewContainer';

// export const header = {headers: {apikey: 'NzQ2YmQ5NmUtODM2MS00ZDg2LTg4NzMtZGE0ZDExZmViN2U3'}};

// function App() {
//   const [data, setData] = useState(null);
//   const [isPending, setIsPending] = useState(false);
//   const [view, setView] = useState('grid');
//   const [channels, setChannels] = useState({albums: true, artists: true, tracks: true})

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const [query, type] = [params.get('query'), params.get('type')];
//     setIsPending(true);
//     fetch(`https://api.napster.com/v2.2/search/verbose?query=${query}`, header)
//     .then(res => {
//      setIsPending(false);
//      return res.json();
//     })
//     .then((data) => {
//       console.log(data);
//       setData(data.search.data[type])
//     });
//   }, []);

//   const getInfo = (data) => {
//     const [type, size] = data.type === 'artist' ? ['artists', '633x422'] : ['albums', '500x500'];
//     const id = data.type === 'track' ? data.albumId : data.id;
//     return {
//       name: data.name,
//       imgSrc: `https://api.napster.com/imageserver/v2/${type}/${id}/images/${size}.jpg`,
//       artist: 'artistName' in data ? data.artistName : ''
//     };
//   };

//   return (
//     <div>
//       <SearchBar/>
//       <ChannelSelect setChannels={setChannels} channels={channels}/>
//       <ViewSelect view={view} setView={setView}/>
//       {isPending && 'Loading...'}
//       {
//       view === 'grid' ?
//       <ViewContainer className='gridView'>
//         {data !== null && data.map((item, index) => <Card key={index} info={getInfo(item)}/>)}
//       </ViewContainer> :
//       <ViewContainer>
//         {data !== null && <List data={data} getInfo={getInfo}/>}
//       </ViewContainer>
//       }
//     </div>
//   );
// }




import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
        </Routes>
    )
};
export default App;