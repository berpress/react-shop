import React, { useState, useEffect } from 'react';
import { API_URL } from '../config.js'


function UserInfo (props) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [homeNumber, setHomeNumber] = useState('');

  useEffect(() => {
    async function fetchMyAPI() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('email');
      if (!token && !user) {
        setEmail('-');
        setPhone('-');
        setStreet('-');
        setCity('-');
        setHomeNumber('-');
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
      const responseUser = await fetch(`${API_URL}/user_info/${uuid}`, { 
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                  "Authorization": `JWT ${token}`},
      });
      if (responseUser.status === 404) {
        setEmail('-');
        setPhone('-');
        setStreet('-');
        setCity('-');
        setHomeNumber('-');
        return;
      }
      const dataUser = await responseUser.json();
      setEmail(dataUser.email);
      setPhone(dataUser.phone);
      setStreet(dataUser.address.street);
      setCity(dataUser.address.city);
      setHomeNumber(dataUser.address.home_number);
    }
    fetchMyAPI()
  }, [])



  return (
    <div className="input-field">
          <form action="/my-handling-form-page">
          <img className="image-login" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGolVLdujSf7YevnT5bU0Lki0A-MuMSofgZVnCMmDK70VxObf_p7LMqI_F6QvQesLxOr4&usqp=CAU" alt="user" />
          <p id="email">User email: {email}</p>
          <p id='city'>City: {city}</p>
          <p id='street'>Street: {street}</p>
          <p id='number_home'>Home number: {homeNumber}</p>
          <p id='phone'>Phone: {phone}</p>
          <button 
                class="waves-effect waves-light btn"
                >Edit
          </button>
        </form>
    </div>
  );
}

export {UserInfo};