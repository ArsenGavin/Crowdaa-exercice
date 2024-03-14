import React from 'react';
import './App.css';
import BG from './assets/img/bg.png';
import Logo from './assets/img/crowdaaLogo.png';
import Homepage from './pages/Homepage/Homepage';

export default function App() {
    return (
        <div className='App'>
            <img className='imgBackground' src={BG} alt='background'/>
            <img className='logo' src={Logo} alt='Logo'/>
            <Homepage/>
        </div>
    );
}