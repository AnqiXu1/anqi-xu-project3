import React from 'react';
import { useSudoku } from '../context/SudokuContext';
import '../styles/common.css';

const Scores = () => {
    const { scores, formatTime } = useSudoku();

    return (
        <div className="container">
            <h1 style={{ textAlign: 'center' }}>🏆 Top 10 High Scores</h1>
            <div className="scores-container" style={{ marginTop: '20px' }}>
                {scores.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>No records yet. Solve a puzzle to see your score here!</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                                    <th style={{ padding: '12px' }}>Rank</th>
                                    <th style={{ padding: '12px' }}>User</th>
                                    <th style={{ padding: '12px' }}>Mode</th>
                                    <th style={{ padding: '12px' }}>Time</th>
                                    <th style={{ padding: '12px' }}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scores.map((score, index) => (
                                    <tr key={score.id} style={{ borderBottom: '1px solid #eee', textAlign: 'center' }}>
                                        <td style={{ padding: '12px' }}>{index + 1}</td>
                                        <td style={{ padding: '12px' }}>{score.user}</td>
                                        <td style={{ padding: '12px', textTransform: 'capitalize' }}>{score.difficulty}</td>
                                        <td style={{ padding: '12px', fontWeight: 'bold' }}>{formatTime(score.time)}</td>
                                        <td style={{ padding: '12px', color: '#7f8c8d', fontSize: '0.9em' }}>{score.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Scores;