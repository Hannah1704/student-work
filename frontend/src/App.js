import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SplashPage } from './pages/SplashPage';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { PlaylistPage } from './pages/PlaylistPage';
import { Header } from './components/Header'; 

function App()
{
    const location = useLocation();

    return (
        <div>
            {location.pathname !== "/" && <Header />}
            <Routes>
                <Route path="/" element={<SplashPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/playlist" element={<PlaylistPage />} />
            </Routes>
        </div>
    );
}

export default function AppWrapper() 
{
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}
