import { createContext, useState } from "react";

import PRODUCTS from '../shopdata.json'

export const Products = createContext({
    products: []
})

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS)
    const value = {products}
    return(
        <Products.Provider value={value}>{children}</Products.Provider>
    )
}