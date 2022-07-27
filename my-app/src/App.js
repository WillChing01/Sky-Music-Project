import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useSearchParams } from 'react-router-dom';

import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import NavBar from './components/NavBar/NavBar';
import Player from './components/Player/Player';

import './App.css';

const App = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    
    return (
        <div className='page dark-mode'>
            <NavBar searchParams={searchParams} setSearchParams={setSearchParams}/>
            <Routes>
                <Route path='/' element={<Home searchParams={searchParams} />} />
                <Route path='/profile/*' element={<Profile />} />
            </Routes>
            <Player />
        </div>
    )
};
export default App;