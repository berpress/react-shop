import React, { useState } from 'react';
import { Error } from '../components/Error';
import { API_URL } from '../config.js'
import { AlertLogin } from '../components/AlertLogin';




function Balance() {
    const [user, setUser] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardDate, setCardDate] = useState('');
    const [money, setMoney] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const [error, setError] = useState('');
    const [alertBalance, setAlertBalance] = useState('');

    const closeAlert = () => {
        setAlertBalance('');
    };

    const addBalance = async () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('email');
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
        const balanceData = {
            balance: money,
        }
        const responseBalance = await fetch(`${API_URL}/balance/${uuid}`, { 
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                    "Authorization": `JWT ${token}`},
                    body: JSON.stringify(balanceData)
        });
        if (responseBalance.status === 201) {
            setAlertBalance(`All good, you added ${money} RUB to your account`);
        } else {
            setAlertBalance(`Erorr! Please check network!`);
        }
        setCardNumber('');
        setCardDate('');
        setMoney('');
        setCheckbox(false);
    }

    const handleBalance = async (e) => {
        e.preventDefault();
        if(user === '') {
            setError('Check user name and last name! It must be not empty!');
            return;
        } else if (cardNumber === '' || cardNumber.length !== 16) {
            setError('Check card number! It must be 16 symbols and not empty!');
            return;
        } else if (cardDate === '') {
            setError('Check card date! It must be not empty!');
            return;
        } else if (money === '') {
            setError('Check money! It must be not empty!');
            return;
        } else if (!checkbox) {
            setError('Read agree and click checkbox!');
            return;
        }else {
            setError('');
        }

        await addBalance();
    }

    return (
        <div className="row">
            <img className="image-card" src="https://www.masculist.ru/upload/blogs/95d4dfdcb3bde5338cfaf2131ff89a19.jpeg" alt="card" />
    <form className="col s12">
      <div className="row">
        <div className="input-field col s6">
          <i className="material-icons prefix">account_circle</i>
          <input id="icon_prefix" 
            type="text" 
            className="validate"
            value={user} 
            onChange={(e) => setUser(e.target.value)}  />
          <label for="icon_prefix"></label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">credit_card</i>
          <input id="icon_telephone" 
            type="tel" 
            className="validate"
            value={cardNumber} 
            onChange={(e) => setCardNumber(e.target.value)} />
          <label for="icon_telephone"></label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">date_range</i>
          <input id="icon_telephone" 
            type="tel" 
            className="validate"
            value={cardDate} 
            onChange={(e) => setCardDate(e.target.value)} />
          <label for="icon_telephone"></label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">attach_money</i>
          <input id="icon_telephone" 
            type="tel" 
            className="validate"
            value={money} 
            onChange={(e) => setMoney(e.target.value)}
           />
          <label for="icon_telephone"></label>
        </div>
        <p>
            <label id="agree">
                <input 
                type="checkbox"
                value={checkbox} 
                onChange={(e) => setCheckbox(!checkbox)} />
                <span>Agree to the rules</span>
            </label>
        </p>
        <button 
                class="waves-effect waves-light btn"
                onClick={handleBalance}
                >Transfer
        </button>
      </div>
      {}
      {error && <Error name={error} />}
      {alertBalance && <AlertLogin name={alertBalance} closeAlert={closeAlert} />}

    </form>
  </div>
)
};

export {Balance};