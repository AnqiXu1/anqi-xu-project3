import React, { useEffect, useState } from 'react';
import { useSudoku } from '../context/SudokuContext';
import axios from 'axios';
import '../styles/common.css';

const Scores = () => {
    const { formatTime } = useSudoku();
    const [leaderboard, setLeaderboard] = useState([]);
    const [viewMode, setViewMode] = useState('Easy');
    const [loading, setLoading] = useState(false);

  
    const formatDate = (dateValue) => {
        if (!dateValue) return 'N/A';
        const date = new Date(dateValue);

        return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
    };

    const fetchLeaderboard = async (mode) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://anqi-xu-project3-backend.onrender.com/api/games/leaderboard/${mode}`);
            setLeaderboard(response.data);
        } catch (err) {
            console.error("Failed to fetch leaderboard:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard(viewMode);
    }, [viewMode]);

    return (
        <div className="container">
            <h1 style={{ textAlign: 'center' }}>🏆 Top 10 High Scores</h1>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                <button 
                    className={`auth-submit ${viewMode === 'Easy' ? '' : 'inactive'}`}
                    style={{ backgroundColor: viewMode === 'Easy' ? '#3498db' : '#bdc3c7', padding: '10px 20px' }}
                    onClick={() => setViewMode('Easy')}
                >
                    Easy (6x6)
                </button>
                <button 
                    className={`auth-submit ${viewMode === 'Hard' ? '' : 'inactive'}`}
                    style={{ backgroundColor: viewMode === 'Hard' ? '#e67e22' : '#bdc3c7', padding: '10px 20px' }}
                    onClick={() => setViewMode('Hard')}
                >
                    Hard (9x9)
                </button>
            </div>

            <div className="scores-container">
                {loading ? (
                    <p style={{ textAlign: 'center' }}>Loading records...</p>
                ) : leaderboard.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>No records yet for {viewMode} mode. Be the first!</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                                    <th style={{ padding: '12px' }}>Rank</th>
                                    <th style={{ padding: '12px' }}>User</th>
                                    <th style={{ padding: '12px' }}>Time</th>
                                    <th style={{ padding: '12px' }}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map((record, index) => (
                                    <tr key={record._id || index} style={{ borderBottom: '1px solid #eee', textAlign: 'center' }}>
                                        <td style={{ padding: '12px' }}>{index + 1}</td>
                                        <td style={{ padding: '12px' }}>
                                            {/**/}
                                            {record.userId?.username || record.username || 'Unknown'}
                                        </td>
                                        <td style={{ padding: '12px', fontWeight: 'bold' }}>{formatTime(record.timer)}</td>
                                        <td style={{ padding: '12px', color: '#7f8c8d', fontSize: '0.9em' }}>
                                            {/**/}
                                            {formatDate(record.createdAt || record.date || record.timestamp)}
                                        </td>
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