import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config.js'


function Header() {
  const [balance, setUserBalance] = useState(0);
  
  useEffect(() => {
    async function fetchMyAPI() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('email');
      if (!token && !user) {
        setUserBalance('0');
        return;
      }
      const registerData = {
        username: user,
        password: 'AnyPassword'
      }
      const response = await fetch(`${API_URL}/register`, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(registerData)
      });
      const data = await response.json();
      const uuid = data.uuid;
      const responseBalance = await fetch(`${API_URL}/balance/${uuid}`, { 
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                  "Authorization": `JWT ${token}`},
      });
      console.log(responseBalance);
      if (responseBalance.status === 404) {
        setUserBalance('0');
        return;
      }
      const dataBalance = await responseBalance.json();
      setUserBalance(dataBalance.balance);
    }
    fetchMyAPI()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }
  return (
      <nav className='darken-1'>
          <div className='nav-wrapper'>
              <a href='/react-shop' className='brand-logo'>
                Products Shop
              </a>
              <ul id='nav-mobile' className='right hide-on-med-and-down'>
                  <li>
                    <Link to={`/user`} id="user-link">User</Link>
                  </li>

                  <li>
                    <Link to={`/balance`} id="blance-link">Balance is {balance}</Link>
                  </li>
                  <li>
                    <Link to={`/register`} id="register-link">Register</Link>
                  </li>
                  <li>
                    <Link to={`/login`} id="login-link">Login</Link>
                  </li>
                  <li>
                      <a
                          href='#!'
                          rel='noreferrer'
                          onClick={handleLogout}
                          id="user-link"
                      >
                          Logout
                      </a>
                  </li>
              </ul>
          </div>
      </nav>
  );
}

export { Header };