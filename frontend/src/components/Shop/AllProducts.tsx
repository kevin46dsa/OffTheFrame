import { ProductGrid } from './Layout/ProductGrid'
import { products } from '../../data/productData'


export function AllProducts() {

   // TODO: Fetch products from API
   const productsData = products


    return (
        <div>
            <h1>All Products</h1>
            <ProductGrid products={productsData} />
        </div>
    )
}