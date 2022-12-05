import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";

import { User } from "../../contexts/User";
import { signOutUser } from "../../utils/firebase/firebase";

import './navigation.scss'

import {ReactComponent as Logo} from '../../assets/logo.svg'

const Navigation = () => {

    const { currentUser } = useContext(User);

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
                    
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;