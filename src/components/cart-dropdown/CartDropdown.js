import { useContext } from 'react'

import { Cart } from '../../contexts/Cart'


import './cart-dropdown.scss'
import CartItem from '../cart-item/CartItem'

import Button from '../button/Button'


const CartDropdown = () => {
    const { cartItems } = useContext(Cart);
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => <CartItem key={item.id} CartItem={item}/>)}
            </div>

            <Button>CHECKOUT</Button>
        </div>
    )


}

export default CartDropdown;