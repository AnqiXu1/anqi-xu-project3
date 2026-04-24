import React from 'react';
import '../styles/common.css';
import '../styles/auth.css';

const Register = () => {
    return (
        <div className="container auth-container">
            <div className="auth-box">
                <h1>Register</h1>
                <p>Create a new account to track your scores.</p>
                
                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            placeholder="Choose a username" 
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Create a password" 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Verify Password</label>
                        <input 
                            type="password" 
                            placeholder="Repeat your password" 
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