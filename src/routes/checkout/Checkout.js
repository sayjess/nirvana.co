import './checkout.scss'

import { useContext } from 'react';

import { Cart } from '../../contexts/Cart';

import CheckoutItem from '../../components/checkout-items/CheckoutItem';

const Checkout = () => {
    const {cartItems, totalPrice} = useContext(Cart)

    return(
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>

                </div>
                <div className='header-block'>
                    <span>Description</span>

                </div>
                <div className='header-block'>
                    <span>Quantity</span>

                </div>
                <div className='header-block'>
                    <span>Price</span>

                </div>
                <div className='header-block'>
                    <span>Remove</span>

                </div>
            </div>
            {cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            ))}
            <span className='total'>Total: ${totalPrice}</span>
        </div>
    )
}

export default Checkout;