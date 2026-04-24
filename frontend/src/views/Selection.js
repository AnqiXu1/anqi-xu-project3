import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSudoku } from '../context/SudokuContext';
import '../styles/common.css';

const Selection = () => {
    const navigate = useNavigate();
    const { startGame } = useSudoku();

    const handleSelect = (mode) => {
        startGame(mode);
        navigate(`/games/${mode}`);
    };

    return (
        <div className="container" style={{ textAlign: 'center' }}>
            <h1>Select Your Game Mode</h1>
            <p style={{ color: '#666', marginBottom: '30px' }}>Choose a difficulty level to start your Sudoku challenge.</p>
            
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '20px', 
                maxWidth: '400px', 
                margin: '0 auto' 
            }}>
                <button 
                    className="auth-submit" 
                    style={{ backgroundColor: '#3498db', padding: '20px', fontSize: '1.2rem' }}
                    onClick={() => handleSelect('easy')}
                >
                    Easy Mode (6 x 6)
                </button>
                
                <button 
                    className="auth-submit" 
                    style={{ backgroundColor: '#e67e22', padding: '20px', fontSize: '1.2rem' }}
                    onClick={() => handleSelect('normal')}
                >
                    Normal Mode (9 x 9)
                </button>
            </div>

            <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                <h3>Quick Tips:</h3>
                <ul style={{ textAlign: 'left', display: 'inline-block', color: '#555' }}>
                    <li><strong>Easy:</strong> Great for beginners, smaller grid.</li>
                    <li><strong>Normal:</strong> The classic 9x9 Sudoku experience.</li>
                </ul>
            </div>
        </div>
    );
};

export default Selection;