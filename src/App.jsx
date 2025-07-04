import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import NewsPage from './pages/Nieuws/NewsPage.jsx';
import WeatherPage from './pages/Weer/WeatherPage.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';
import RegisterPage from './pages/Registreren/RegisterPage.jsx';
import ProfilePage from './pages/Profiel/ProfilePage.jsx';
import FavorietenPage from './pages/Favorieten/FavorietenPage.jsx';


function App() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main className="container" style={{ flex: 1 }}>
                {/*Routes die voor iedereen toegankelijk zijn.*/}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/nieuws" element={<NewsPage />} />
                    <Route path="/weer" element={<WeatherPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    {/* Beveiligde routes, gewikkeld in onze ProtectedRoute component. */}
                    <Route path="/profiel" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}/>
                    <Route path="/favorieten" element={<ProtectedRoute><FavorietenPage /></ProtectedRoute>}/>
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;