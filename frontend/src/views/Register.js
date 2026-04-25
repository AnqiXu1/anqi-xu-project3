import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/common.css';
import '../styles/auth.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== verifyPassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/users/register', {
                username,
                password
            });

            if (response.status === 201 || response.status === 200) {
                setMessage('Registration successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Try a different username.');
        }
    };

    return (
        <div className="container auth-container">
            <div className="auth-box">
                <h1>Register</h1>
                <p>Create a new account to track your scores.</p>
                
                {/**/}
                {error && <div style={{ color: '#e74c3c', marginBottom: '10px' }}>{error}</div>}
                {message && <div style={{ color: '#2ecc71', marginBottom: '10px' }}>{message}</div>}
                
                <form className="auth-form" onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            placeholder="Choose a username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Create a password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Verify Password</label>
                        <input 
                            type="password" 
                            placeholder="Repeat your password" 
                            value={verifyPassword}
                            onChange={(e) => setVerifyPassword(e.target.value)}
                            required 
                        />
                    </div>
                    
                    <button type="submit" className="auth-submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;