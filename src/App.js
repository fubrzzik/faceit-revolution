import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Home, Match, NotFound } from './pages';

import './assets/css/index.scss';

const App = () => {
    return (
        <BrowserRouter>
            <Header />

            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/match/:matchID" element={<Match />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App