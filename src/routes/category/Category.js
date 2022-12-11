import './category.scss'

import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';

import { Categories } from '../../contexts/Categories';

import ProductCard from '../../components/product-card/ProductCard';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(Categories);
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <div className='category-container'>
            {
                products && products.map((product) => <ProductCard key={product.id} product={product}/>)
            }
        </div>
    )

}

export default Category;