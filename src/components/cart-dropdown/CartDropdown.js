import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { Cart } from '../../contexts/Cart'


import './cart-dropdown.scss'
import CartItem from '../cart-item/CartItem'

import Button from '../button/Button'


const CartDropdown = () => {
    const { cartItems } = useContext(Cart);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => <CartItem key={item.id} CartItem={item}/>)}
            </div>

            <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
        </div>
    )


}

export default CartDropdown;