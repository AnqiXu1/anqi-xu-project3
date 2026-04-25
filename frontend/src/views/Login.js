import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/common.css';
import '../styles/auth.css';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://https://anqi-xu-project3-backend.onrender.com/api/users/login', {
                username,
                password
            });


            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                

                navigate('/games');
            }
        } catch (err) {

            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="container auth-container">
            <div className="auth-box">
                <h1>Login</h1>
                <p>Please enter your credentials to continue.</p>
                
                {/**/}
                {error && <div style={{ color: '#e74c3c', marginBottom: '10px', fontSize: '0.9em' }}>{error}</div>}
                
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            placeholder="Enter username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    
                    <button type="submit" className="auth-submit">
                        Login
                    </button>
                </form>
                <p style={{ marginTop: '20px', fontSize: '0.9em' }}>
                    Don't have an account? <Link to="/register" style={{ color: '#3498db', textDecoration: 'none' }}>Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;