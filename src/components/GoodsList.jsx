import React from 'react';

import { GoodsItem } from './GoodsItems';
import { API_URL } from '../config.js'


const addStore = async(name, token) => {
  const response = await fetch(`${API_URL}/store/${name}`, { 
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              "Authorization": `JWT ${token}`
            },
  });
  const data = await response.json();
  const id = data.uuid;
  console.log(`store ${name} was add, uuid is ${id}`)
  return id;
}

const addItem = async(name, description, price, storeId, image, token) => {
  const body = {
    description: description,
    price: price,
    store_id: storeId,
    image: image,
  }
  const response = await fetch(`${API_URL}/item/${name}`, { 
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              "Authorization": `JWT ${token}`
            },
    body: JSON.stringify(body)
  });
  await response.json();
  console.log(`item ${name} was add`)
}

function GoodsList(props) {
    const { goods = [], 
      addToBasket = Function.prototype,
      removeFromBasket = Function.prototype
    } = props;

    const handlerPrepereClick = async () => {
      const email = `${Date.now()}_admin.com`;
      const password = 'Password11';
      console.log(email);
      // register
      const registerData = {
        username: email,
        password: password
      }
      const response = await fetch(`${API_URL}/register`, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(registerData)
      });
      const data = await response.json();
      const uuid = data.uuid;
      console.log(`Get ${uuid}`);
      // Auth and get token
      const responseAuth = await fetch(`${API_URL}/auth`, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(registerData)
      });
      const dataAuth = await responseAuth.json();
      const token = dataAuth.access_token;
      console.log(`Get token ${token}`);

      // Add stores
      const idVegatebles = await addStore('vegetables', token);
      const idfruits = await addStore('fruits', token);
      const idWaters = await addStore('waters', token);
      const idSweets = await addStore('sweets', token);
      const idbBkery = await addStore('bakery', token);

      // Add Items
      await addItem(
        'bananas', 
        'Delicious Brazilian bananas, 1 kg.', 
        99, 
        idfruits, 
        'https://github.com/berpress/online-grocery-store/blob/main/images_shop/bananes.jpg?raw=true',
        token
        )

      await addItem(
        'apples', 
        'Delicious red apples, 1 kg.', 
        112, 
        idfruits, 
        'https://github.com/berpress/online-grocery-store/blob/main/images_shop/apples.jpg?raw=true',
        token
        )
      
      await addItem(
        'tomate', 
        'Fresh tomatoes, 1 kg.', 
        38, 
        idVegatebles, 
        'https://github.com/berpress/online-grocery-store/blob/main/images_shop/tomate.jpg?raw=true',
        token
        )

      await addItem(
        'potatoes', 
        'Russian potatoes, 2 kg.', 
        20, 
        idVegatebles, 
        'https://github.com/berpress/online-grocery-store/blob/main/images_shop/potatoes.jpg?raw=true',
        token
        )

      await addItem(
        'pepsi', 
        'Pepsi 1L', 
        38, 
        idWaters, 
        'https://github.com/berpress/online-grocery-store/blob/main/images_shop/Pepsi.jpg?raw=true',
        token
        )

      await addItem(
        'juice Orange', 
        'Orange juice, 750 ml.', 
        111, 
        idWaters, 
        'https://github.com/berpress/online-grocery-store/blob/main/images_shop/orange.jpg?raw=true',
        token
        )

      await addItem(
        'Vanilla ice cream', 
        'Vanilla ice cream, 150 gr.', 
        47, 
        idSweets, 
        'https://github.com/berpress/online-grocery-store/blob/main/images_shop/icecream.png?raw=true',
        token
        )

      await addItem(
          'Chocolate', 
          'Black chocolate, 100 gr.', 
          214, 
          idSweets, 
          'https://github.com/berpress/online-grocery-store/blob/main/images_shop/chocolate.jpg?raw=true',
          token
        )

      await addItem(
        'Bread', 
        'White bread, 340 gr.', 
        47, 
        idbBkery, 
        'https://github.com/berpress/online-grocery-store/blob/main/images_shop/bread.jpg?raw=true',
        token
      )

      await addItem(
        'Cake', 
        'Cake, 75 gr.', 
        99, 
        idbBkery, 
        'https://github.com/berpress/online-grocery-store/blob/main/images_shop/cake.jpeg?raw=true',
        token
      )
    }


    if (!goods.length) {
        return (
          <div><h3>Nothing here, see github</h3>
          <a href="https://github.com/berpress/flask-restful-api">Rest API</a> and 
          <a href="https://github.com/berpress/online-grocery-store"> Front </a>
          or prepare data with API requests: 
          <button onClick={handlerPrepereClick}>Prepere data</button>
          </div>
        )
    }

    return (
        <div className='goods'>
            {goods.map((item) => (
                <GoodsItem 
                key={item.itemID} 
                {...item} 
                addToBasket={addToBasket} 
                removeFromBasket={removeFromBasket}/>
            ))}
        </div>
    );
}

export { GoodsList };