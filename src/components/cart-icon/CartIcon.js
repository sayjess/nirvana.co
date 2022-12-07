import './cart-icon.scss'
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'

import { Cart } from '../../contexts/Cart'

import { useContext } from 'react'

const CartIcon = () => {

    const {toggleCart, setToggleCart} = useContext(Cart);

    const toggleHandler = () => setToggleCart(!toggleCart);

    return (
        <div className='cart-icon-container' onClick={toggleHandler}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>0</span>
        </div>
    )

}

export default CartIcon;