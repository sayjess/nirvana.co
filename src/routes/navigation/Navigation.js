import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";

import CartIcon from "../../components/cart-icon/CartIcon";
import CartDropdown from "../../components/cart-dropdown/CartDropdown";

import { User } from "../../contexts/User";
import { Cart } from "../../contexts/Cart";

import { signOutUser } from "../../utils/firebase/firebase";

import './navigation.scss'

import {ReactComponent as Logo} from '../../assets/logo.svg'

const Navigation = () => {

    const { currentUser } = useContext(User);
    const { toggleCart } = useContext(Cart)

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <Logo className="logo"/>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    
                        {!currentUser ? 
                        <Link className="nav-link" to='/auth'>Sign In</Link>
                        : 
                        <span className="nav-link" onClick={signOutUser}>Sign Out</span> }
                    <CartIcon />
                </div>
                {toggleCart && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;