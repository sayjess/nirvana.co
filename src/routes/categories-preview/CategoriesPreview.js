import { useContext, Fragment } from "react";

import { Categories } from "../../contexts/Categories";
import CategoryPreview from "../../components/category-preview/CategoryPreview";


const CategoriesPreview = () => {
    const { categoriesMap } = useContext(Categories)
    return (
        <Fragment>
            { 
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title]
                    return(
                        <CategoryPreview key={title} title={title} products={products}/>
                    )
                })
            }
        </Fragment>
    )
}

export default CategoriesPreview;