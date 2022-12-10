import './cart-icon.scss'
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'

import { Cart } from '../../contexts/Cart'

import { useContext } from 'react'

const CartIcon = () => {

    const {isCartOpen, setIsCartOpen, productCount} = useContext(Cart);

    const toggleHandler = () => setIsCartOpen(!isCartOpen);

    return (
        <div className='cart-icon-container' onClick={toggleHandler}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{productCount}</span>
        </div>
    )

}

export default CartIcon;