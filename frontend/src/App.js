import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SplashPage } from './pages/SplashPage';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { PlaylistPage } from './pages/PlaylistPage';
import { Header } from './components/Header'; // Navbar

class App extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Routes>
                        <Route path="/" element={<SplashPage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/playlist" element={<PlaylistPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

// will hide the navbar using this iteration instead:
// import React from 'react';
// import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// import { SplashPage } from './pages/SplashPage';
// import { HomePage } from './pages/HomePage';
// import { ProfilePage } from './pages/ProfilePage';
// import { PlaylistPage } from './pages/PlaylistPage';
// import { Header } from './components/Header'; // Navbar

// // Functional component to access useLocation
// function App() {
//     const location = useLocation();

//     return (
//         <div>
//             {/* Conditionally render Header only if not on the Splash page */}
//             {location.pathname !== "/" && <Header />}
//             <Routes>
//                 <Route path="/" element={<SplashPage />} />
//                 <Route path="/home" element={<HomePage />} />
//                 <Route path="/profile" element={<ProfilePage />} />
//                 <Route path="/playlist" element={<PlaylistPage />} />
//             </Routes>
//         </div>
//     );
// }

// // Wrap App with BrowserRouter outside for routing
// export default function AppWrapper() {
//     return (
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     );
// }
