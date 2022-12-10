import { createContext, useState } from "react";


const  addCartItem = (cartItems, productToAdd ) => {
    //find if cartItem contains product to add
    const existingCartItem = cartItems.some((cartItem) => cartItem.id === productToAdd.id)
    // if found incremenet quantity
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
    }
    //return new array with modified cart items/ new cart items
    return [...cartItems, {...productToAdd, quantity : 1}];
    
}

const newCartCount = (currentCartItems) => currentCartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 1)

export const Cart = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    productCount: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [productCount, setProductCount] = useState(0);
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
        setProductCount(newCartCount(cartItems))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, productCount};
    
    return(
        <Cart.Provider value={value}>{children}</Cart.Provider>
    )
}