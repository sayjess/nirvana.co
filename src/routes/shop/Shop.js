import { useContext } from "react";

import { Products } from "../../contexts/Products";
import ProductCard from "../../components/product-card/ProductCard";

import './shop.scss'

const Shop = () => {
    const {products} = useContext(Products)
    return (
        <div className="products-container">
            {products.map(product => (
                <ProductCard key={product.id} product={product}></ProductCard>
            ))}
        </div>
    )
}

export default Shop;