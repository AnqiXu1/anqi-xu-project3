import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/common.css';
import '../styles/auth.css';

const Login = () => {
    return (
        <div className="container auth-container">
            <div className="auth-box">
                <h1>Login</h1>
                <p>Please enter your credentials to continue.</p>
                
                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            placeholder="Enter username" 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter password" 
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