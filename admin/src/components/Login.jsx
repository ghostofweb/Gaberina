import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize the navigate function

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/user/admin', 
                { email, password });

            // If login is successful, token will be returned and stored in localStorage
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);  // Store token in localStorage
                console.log('Login successful');
                window.location.reload();  // Refresh the page
            } else {
                console.error('Invalid credentials');
            }
        } catch (error) {
            console.error('Error during login', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-dark">
            <div className="bg-lighterDark shadow-md rounded-lg px-8 py-6 max-w-md flex flex-col w-full">
                <h1 className="text-champagne text-2xl font-bold mb-6 text-center">Admin Panel</h1>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="text-sm font-medium text-gold block mb-2">Email Address</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="your@gmail.com"
                            required
                            className="rounded-md w-full px-3 py-2 border border-champagne bg-transparent text-white focus:ring focus:ring-champagne outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm font-medium text-gold block mb-2">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="*******"
                            required
                            className="rounded-md w-full px-3 py-2 border border-champagne bg-transparent text-white focus:ring focus:ring-champagne outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gold text-buttontxt py-2 rounded-md text-sm font-semibold hover:bg-champagne transition-colors duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
