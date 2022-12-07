import './cart-dropdown.scss'

import Button from '../button/Button'


const CartDropdown = () => {
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'/>
            <Button>CHECKOUT</Button>
        </div>
    )


}

export default CartDropdown;