import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SudokuProvider } from './context/SudokuContext';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Selection from './views/Selection';
import Rules from './views/Rules';
import Login from './views/Login';
import Register from './views/Register';
import Scores from './views/Scores';
import GamePage from './views/GamePage';
import './styles/common.css';

function App() {
    return (
        <SudokuProvider>
            <Router>
                <div className="App">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/games" element={<Selection />} />
                        <Route path="/games/easy" element={<GamePage difficulty="easy" />} />
                        <Route path="/games/normal" element={<GamePage difficulty="normal" />} />
                        <Route path="/rules" element={<Rules />} />
                        <Route path="/scores" element={<Scores />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </Router>
        </SudokuProvider>
    );
}

export default App;