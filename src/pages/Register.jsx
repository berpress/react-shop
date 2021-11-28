import { API_URL } from '../config.js'
import { AlertLogin } from '../components/AlertLogin';
import { Error } from '../components/Error';

import React, { useState } from 'react';

function Register() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [alertName, setAlertName] = useState('');
    const [error, setError] = useState('');


    const closeAlert = () => {
        setAlertName('');
    };

    const validEmail =(email) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

    const handleSigIn = async () => {
        console.log(validEmail(user));
        if(!validEmail(user)) {
          setError(`Error, ${user} is not email address!`)
          return;
        }
        if (password !== password2) {
          setError('Error, passwords do not match!')
          return;
        }
        if (password.length < 7){
          setError('Password must be longer than 7 characters')
          return;
        }
        const registerData = {
            username: user,
            password: password
        }
        const response = await fetch(`${API_URL}/register`, { 
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(registerData)
        });
        await response;
        if (response.status === 201) {
            setPassword('');
            setUser('');
            setPassword2('');
            setAlertName('Success');
        } else {
            setPassword('');
            setUser('');
            setPassword2('');
            setAlertName('Erorr, check network!');
        }
    }


    return (
        <div class="row">
            <img className="image-login" src="https://cdn3.iconfinder.com/data/icons/business-insurance-8/64/business_insurance-10-512.png" alt="user" />
            <h4>Register new user</h4>
            <div class="input-field col s6">
                <input 
                value={user}
                onChange={(e) => setUser(e.target.value)} 
                id="name" 
                type="text" 
                class="validate" />
                <label class="active" for="first_name2">Email</label>
            </div>

            <div class="input-field col s6">
                <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                id="password1" 
                type="password" 
                class="validate" />
                <label class="active" for="first_name2">Password</label>
            </div>
            <div class="input-field col s6">
                <input 
                value={password2}
                onChange={(e) => setPassword2(e.target.value)} 
                id="password2" 
                type="password" 
                class="validate" />
                <label class="active" for="first_name2">Repeat password</label>
            </div>
            {alertName && <AlertLogin name={alertName} closeAlert={closeAlert} />}
            <button 
                class="waves-effect waves-light btn"
                id="register"
                onClick={handleSigIn}
                >Register
            </button>
            {error && <Error id="error" name={error} />}
        </div>   
    )
}

export {Register};