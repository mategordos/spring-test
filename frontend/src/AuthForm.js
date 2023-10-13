import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import AppNavbar from './AppNavbar';

export default function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory(); // Create a history object for navigation

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('user/login', {
                email: email,
                password: password
            });
            localStorage.setItem('jwtToken', response.data);

            history.push('/');

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <AppNavbar />
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
