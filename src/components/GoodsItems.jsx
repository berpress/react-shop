function GoodsItem(props) {
  const {description, 
          image, 
          price, 
          itemID, 
          name, 
          addToBasket = Function.prototype, 
        } = props;

  return (
    <div className='card'>
        <div className='card-image'>
            <img src={image} alt={name} />
        </div>
        <div className='card-content'>
            <span className='card-title'>{name}</span>
            <p>{description}</p>
        </div>
        <div className='card-action'>
            <button
                className='btn'
                data-test="buy"
                onClick={() =>
                    addToBasket({
                        itemID,
                        name,
                        price,
                    })
                }
            >
                Buy
            </button>
            <span className='right' data-test="price" style={{ fontSize: '1.8rem' }}>
                {price} ₽
            </span>
        </div>
    </div>
);
}

export { GoodsItem };