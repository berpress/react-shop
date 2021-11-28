function BasketItem(props) {
    const {
        itemID,
        name,
        price,
        quantity,
        removeFromBasket = Function.prototype,
        incQuantity = Function.prototype,
        decQuantity = Function.prototype,
    } = props;

    return (
        <li className='collection-item'>
            {name}{' '}
            <i
                className='material-icons basket-quantity'
                onClick={() => decQuantity(itemID)}
                data-test="minus"
            >
                remove
            </i>{' '}
            x{quantity}{' '}
            <i
                className='material-icons basket-quantity'
                onClick={() => incQuantity(itemID)}
                data-test="plus"
            >
                add
            </i>{' '}
            = {price * quantity} rub.
            <span
                className='secondary-content'
                data-test="remove"
                onClick={() => removeFromBasket(itemID)}
            >
                <i className='material-icons basket-delete'>close</i>
            </span>
        </li>
);
}

export {BasketItem};