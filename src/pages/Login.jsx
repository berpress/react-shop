import { API_URL } from '../config.js'
import { AlertLogin } from '../components/AlertLogin';

import React, { useState } from 'react';

function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [alertName, setAlertName] = useState('');

    const closeAlert = () => {
        setAlertName('');
    };

    const handleRegister = async () => {
        const authToken = localStorage.getItem('token');
        if(authToken) {
            setPassword('');
            setUser('');
            setAlertName('You already login, please click logout!');
            return;
        }
        const registerData = {
            username: user,
            password: password
        }
        const response = await fetch(`${API_URL}/auth`, { 
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(registerData)
        });
        const res = await response;
        if (response.status === 200) {
            const token = await res.json();
            localStorage.setItem('token', token.access_token);
            localStorage.setItem('email', user);
            setPassword('');
            setUser('');
            setAlertName('Success');
        } else {
            setPassword('');
            setUser('');
            setAlertName('Invalid credentials');
        }
    }


    return (
        <div class="row">
            <img className="image-login" src="https://cdn3.iconfinder.com/data/icons/business-insurance-8/64/business_insurance-10-512.png" alt="user" />
            <h4>Sign in</h4>
            <div class="input-field col s6">
                <input 
                value={user}
                onChange={(e) => setUser(e.target.value)} 
                id="first_name2" 
                type="text" 
                class="validate" />
                <label class="active" for="first_name2">Email</label>
            </div>

            <div class="input-field col s6">
                <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                id="first_name2" 
                type="password" 
                class="validate" />
                <label class="active" for="first_name2">Password</label>
            </div>
            <button 
                class="waves-effect waves-light btn"
                id="register"
                onClick={handleRegister}
                >Start
            </button>
            {alertName && <AlertLogin name={alertName} closeAlert={closeAlert} />}
        </div>
        
    )
}

export {Login};