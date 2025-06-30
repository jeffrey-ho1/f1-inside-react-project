import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import HomePage from './pages/HomePage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import WeatherPage from './pages/WeatherPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import FavorietenPage from './pages/FavorietenPage.jsx';

function App() {
    return (
// Een div die de hele viewport vult en de footer onderaan zet.
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