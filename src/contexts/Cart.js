import { createContext, useEffect, useState } from "react";


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

const removeCartItem = (cartItems, productToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)
    //check if quantity is equal to 1, if it is remove item from cart
    if(existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
    }
    //if not return back cart items with matching cartitem with reduced quantity
    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
}

const clearCartItem = (cartItems, productToClear) => cartItems.filter((cartItem) => cartItem.id !== productToClear.id);

// const newCartCount = (currentCartItems) => currentCartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 1)

export const Cart = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    productCount: 0,
    totalPrice: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [productCount, setProductCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
        // setProductCount(newCartCount(cartItems)) //delete this
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
        // setProductCount(newCartCount(cartItems)) //delete this
    }
    const clearItemFromCart = (productToRemove) => {
        setCartItems(clearCartItem(cartItems, productToRemove))
        // setProductCount(newCartCount(cartItems)) //delete this
    }

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setProductCount(newCartCount);
        
        const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0)
        setTotalPrice(newCartTotal)
    }, [cartItems]);


    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, productCount, removeItemFromCart, clearItemFromCart, totalPrice};
    
    return(
        <Cart.Provider value={value}>{children}</Cart.Provider>
    )
}