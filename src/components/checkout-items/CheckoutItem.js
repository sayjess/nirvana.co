import './checkout-items.scss'

import { useContext } from 'react';

import { Cart } from '../../contexts/Cart';

const CheckoutItem = ({cartItem}) => {
    const { name, price, quantity, imageUrl} = cartItem;
    const {clearItemFromCart, addItemToCart, removeItemFromCart} = useContext(Cart)
    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name}/>
            </div>
            <span className='name'>{name}</span>
            <div className='quantity'>
                <button onClick={() => removeItemFromCart(cartItem)} className='arrow'>
                    &#10094;
                </button>
                <span className='value'>{quantity}</span>
                <button className='arrow' onClick={() => addItemToCart(cartItem)}>
                    &#10095;
                </button>
            </div>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={() => clearItemFromCart(cartItem)}>&#10005;</div>
        </div>
    )

}

export default CheckoutItem;