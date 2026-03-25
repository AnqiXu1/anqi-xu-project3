import React from 'react';
import '../styles/common.css';

const Rules = () => {
    return (
        <div className="container">
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Sudoku Rules</h1>
            
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', lineHeight: '1.6' }}>
                <section>
                    <h2>The Goal</h2>
                    <p>The objective is to fill the grid with numbers so that every row, column, and sub-grid contains all of the digits available for that board size.</p>
                </section>

                <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />

                <section>
                    <h2>Basic Rules</h2>
                    <ul>
                        <li><strong>Each Row:</strong> Must contain every number exactly once.</li>
                        <li><strong>Each Column:</strong> Must contain every number exactly once.</li>
                        <li><strong>Each Sub-grid:</strong> Must contain every number exactly once.</li>
                    </ul>
                </section>

                <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />

                <section>
                    <h2>Game Modes in This Project</h2>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                        <div style={{ flex: 1, padding: '15px', border: '1px solid #3498db', borderRadius: '5px' }}>
                            <h3>6 x 6 (Easy)</h3>
                            <p>Uses numbers <strong>1 to 6</strong>. The sub-grids are 2 rows by 3 columns.</p>
                        </div>
                        <div style={{ flex: 1, padding: '15px', border: '1px solid #e67e22', borderRadius: '5px' }}>
                            <h3>9 x 9 (Normal)</h3>
                            <p>Uses numbers <strong>1 to 9</strong>. The sub-grids are 3 rows by 3 columns.</p>
                        </div>
                    </div>
                </section>

                <section style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
                    <p><em>Tip: If a number turns red, it means there is a conflict in that row, column, or sub-grid!</em></p>
                </section>
            </div>
        </div>
    );
};

export default Rules;