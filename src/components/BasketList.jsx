import React, { useState } from 'react';

import { BasketItem } from './BasketItem';
import { API_URL } from '../config.js';
import { AlertLogin } from '../components/AlertLogin';


function BasketList(props) {
  const { order=[], 
    handleBasketShow = Function.prototype,
    removeFromBasket = Function.prototype,
    setOrderZero = Function.prototype,
    incQuantity,
    decQuantity,
  } = props;

  const closeAlert = () => {
    setAlertBalance('');
  };

  const [alertBalance, setAlertBalance] = useState('');

  const totalPrice = order.reduce((sum, el) => {
      return sum + el.price * el.quantity;
  }, 0);

  const buyFromCart = async() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('email');
    if(!token) {
      setAlertBalance('Auth first!');
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
    const results = await Promise.all(order.map(async o => {
      const payData = {
        itemId: o.itemID,
      }
      const res = await fetch(`${API_URL}/pay/${uuid}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', "Authorization": `JWT ${token}`},
        body: JSON.stringify(payData)
      })
      if (res.status === 200) {
        setAlertBalance(`Product ${o.name} buy sucess!`)
      } else if (res.status !== 200) {
        setAlertBalance('Erorr!')
      }
      setOrderZero();
      return res;
    }))
    console.log(results);
  };

  return (
    <ui className="collection basket-list">
      <li className="collection-item active">Cart</li>
        {
          order.length ? order.map((item) =>(
            <BasketItem 
            key={item.itemID}
            incQuantity={incQuantity}
            decQuantity={decQuantity} 
            {...item} 
            removeFromBasket={removeFromBasket}/>
          )) : <li className="collection-item" data-test="cart-empty">Cart is Empty</li>
        }
      <li className="collection-item active" data-test="total-price">Total price: {totalPrice} ₽ </li>
      <i className="material-icons basket-close" onClick={handleBasketShow}>close</i>
      <li className='collection-item'>
          <button className='btn red btn-small' data-test="buy-btn" onClick={buyFromCart}>Buy</button>
      </li>
      {alertBalance && <AlertLogin name={alertBalance} closeAlert={closeAlert} />}
  </ui>
  )
}

export {BasketList};