import React, { useState, useEffect } from 'react';
import { API_URL } from '../config.js'
import { Preloader } from './Preloader';
import { GoodsList } from './GoodsList';
import { Cart } from './Cart';
import { BasketList } from './BasketList';
import { Search } from './Search';
import { Alert } from './Alert';
import { AlertBuy } from './AlertBuy';


function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false);
  const [alertName, setAlertName] = useState('');
  const [alertNameBuy, setAlertNameBuy] = useState('');


  const closeBuy = (name) => {
    setAlertNameBuy(name);
  };


  useEffect(function getGoods() {
      fetch(`${API_URL}/items`, {
      })
      .then(response => response.json())
      .then(data => {
        data && setGoods(data.items);
        setLoading(false);
      })
  }, []) 

  const updateGoods = (name) => {
    const newGoods = goods.filter(function(item) {
      return name === item.name
    })
    setGoods(newGoods);
  }

  const addToBasket = (item) => {
    console.log(order);
    const itemIndex = order.findIndex(
        (orderItem) => orderItem.itemID === item.itemID
  );
    if (itemIndex < 0) {
        const newItem = {
            ...item,
            quantity: 1,
        };
        setOrder([...order, newItem]);
    } else {
        const newOrder = order.map((orderItem, index) => {
            if (index === itemIndex) {
                return {
                    ...orderItem,
                    quantity: orderItem.quantity + 1,
                };
            } else {
                return orderItem;
            }
        });

        setOrder(newOrder);
    }
    setAlertName(item.name);
};

  const handleBasketShow = () => {
    setBasketShow(!isBasketShow);
  };

  const removeFromBasket = (itemId) => {
    const newOrder = order.filter((el) => el.itemID !== itemId);
    setOrder(newOrder);
  };

  const setOrderZero = () => {
    setOrder([]);
    setAlertNameBuy('buy');
  }

  const closeAlert = () => {
    setAlertName('');
  };

  const incQuantity = (itemId) => {
      const newOrder = order.map((el) => {
          if (el.itemID === itemId) {
              const newQuantity = el.quantity + 1;
              return {
                  ...el,
                  quantity: newQuantity,
              };
          } else {
              return el;
          }
      });
      setOrder(newOrder);
    };

  const decQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if (el.itemID === itemId) {
                const newQuantity = el.quantity - 1;
                return {
                    ...el,
                    quantity: newQuantity >= 0 ? newQuantity : 0,
                };
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    };

  return <main className="container content" >
    <Search goods={goods} updateGoods={updateGoods}/>
    <Cart quantity={order.length}handleBasketShow={handleBasketShow} />
    {loading ? <Preloader /> : <GoodsList goods={goods} addToBasket={addToBasket}/>}
    {
      isBasketShow && <BasketList 
      order={order} 
      handleBasketShow={handleBasketShow}
      removeFromBasket={removeFromBasket}
      incQuantity={incQuantity}
      decQuantity={decQuantity}
      setOrderZero={setOrderZero}
      />
    }
    {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
    {alertNameBuy && <AlertBuy closeAlert={closeBuy} name={alertNameBuy}/>}
  </main>
}

export { Shop };
