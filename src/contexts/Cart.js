import { createContext, useState } from "react";

export const Cart = createContext({
    toggleCart: false,
    setToggleCart: () => {}

})

export const CartProvider = ({children}) => {
    const [toggleCart, setToggleCart] = useState(false)
    const value = {toggleCart, setToggleCart}
    return(
        <Cart.Provider value={value}>{children}</Cart.Provider>
    )
}