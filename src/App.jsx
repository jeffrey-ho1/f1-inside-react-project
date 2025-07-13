import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import NewsPage from './pages/Nieuws/NewsPage.jsx';
import TeamsPage from './pages/Teams/TeamsPage';
import RacesPage from "./pages/Races/RacesPage.jsx";
import CoureursPage from './pages/Coureurs/CoureursPage.jsx';
import WeatherPage from './pages/Weer/WeatherPage.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';
import RegisterPage from './pages/Registreren/RegisterPage.jsx';
import ProfilePage from './pages/Profiel/ProfilePage.jsx';
import FavorietenPage from './pages/Favorieten/FavorietenPage.jsx';
import BodyBackground from './assets/BodyBackground.png'
import CoureurDetailPage from './pages/CoureurDetail/CoureurDetailPage';
import TeamDetailPage from './pages/TeamDetail/TeamDetailPage';


function App() {
    return (

            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header />
                <main style={{ flex: 1, backgroundImage: `url(${BodyBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat' }}>

                    <div className="container">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/nieuws" element={<NewsPage />} />
                        <Route path="/races" element={<RacesPage />} />
                        <Route path="/coureurs" element={<CoureursPage />} />
                        <Route path="/coureurs/:driverId" element={<CoureurDetailPage />} />
                        <Route path="/teams" element={<TeamsPage />} />
                        <Route path="/teams/:teamId" element={<TeamDetailPage />} />
                        <Route path="/weer" element={<WeatherPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        <Route path="/profiel" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}/>
                        <Route path="/favorieten" element={<ProtectedRoute><FavorietenPage /></ProtectedRoute>}/>
                    </Routes>
                    </div>
                </main>
                <Footer />
            </div>
    );
}

export default App;