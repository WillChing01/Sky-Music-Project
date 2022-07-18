import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useSearchParams } from 'react-router-dom';

import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import NavBar from './components/NavBar/NavBar';
import Player from './components/Player/Player';

import './App.css';


const App = () => {

    const [view, setView] = useState('grid');
    const [searchParams, setSearchParams] = useSearchParams();
    const [playingInfo, setPlayingInfo] = useState({
        currentPreviewURL: '', 
        name: '', 
        artistName: '', 
        imgSrc: '', 
        play: false
    });
    const [favourites, setFavourites] = useState([])

    return (
        <div className='page'>
            <NavBar view={view} setView={setView} searchParams={searchParams} setSearchParams={setSearchParams}/>
            <Routes>
                <Route path='/' element={<Home view={view} searchParams={searchParams} playingInfo={playingInfo} setPlayingInfo={setPlayingInfo} />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
            <Player playingInfo={playingInfo} setPlayingInfo={setPlayingInfo}/>
        </div>
    )
};
export default App;