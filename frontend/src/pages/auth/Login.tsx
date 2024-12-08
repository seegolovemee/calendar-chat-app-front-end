import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', formData);
            // If login is successful, navigate to the homepage
            if (response.status === 200) {
                navigate('/homepage');
            }
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Error logging in');
        }
    };

    return (
        <div className="auth-page">
            {/* Left Section */}
            <div className="auth-left">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                {message && <p>{message}</p>}
            </div>

            {/* Right Section */}
            <div className="auth-right">
                Welcome Back!
            </div>
        </div>
    );
};

export default Login;
