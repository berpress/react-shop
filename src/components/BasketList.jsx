import { BasketItem } from './BasketItem';

function BasketList(props) {
  const { order=[], 
    handleBasketShow = Function.prototype,
    removeFromBasket = Function.prototype,
    setOrderZero = Function.prototype,
    incQuantity,
    decQuantity,
  } = props;

  const totalPrice = order.reduce((sum, el) => {
      return sum + el.price * el.quantity;
  }, 0);

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
          <button className='btn red btn-small' data-test="buy-btn" onClick={setOrderZero}>Buy</button>
      </li>
  </ui>
  )
}

export {BasketList};