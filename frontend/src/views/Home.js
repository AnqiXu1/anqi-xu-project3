import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            minHeight: '60vh',
            textAlign: 'center' 
        }}>
            <h1 style={{ fontSize: '3rem', color: '#2c3e50', marginBottom: '10px' }}>
                Sudoku Master
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#7f8c8d', maxWidth: '600px', marginBottom: '40px' }}>
                Challenge your mind with the classic logic-based number puzzle. 
                Choose your difficulty and start solving!
            </p>

            <div style={{ display: 'flex', gap: '20px' }}>
                <button 
                    className="auth-submit" 
                    style={{ width: '200px', padding: '15px', fontSize: '1.1rem' }}
                    onClick={() => navigate('/games')}
                >
                    Play Now
                </button>
                
                <button 
                    className="auth-submit" 
                    style={{ 
                        width: '200px', 
                        padding: '15px', 
                        fontSize: '1.1rem', 
                        backgroundColor: '#95a5a6' 
                    }}
                    onClick={() => navigate('/rules')}
                >
                    How to Play
                </button>
            </div>

            <div style={{ marginTop: '50px', color: '#bdc3c7', fontSize: '0.9rem' }}>
                <p>Created by Anqi Xu</p>
            </div>
        </div>
    );
};

export default Home;