import { ProductGrid } from './Layout/ProductGrid'
import { fetchAllProducts } from '../../service/product/productApi'
import { useEffect, useState } from 'react'


export function AllProducts() {

    const [products, setProducts] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        async function loadProducts() {
          try {
            setLoading(true)
            const allProducts = await fetchAllProducts()
            setProducts(allProducts)
          } catch {
            setProducts([])
          } finally {
            setLoading(false)
          }
        }
      
        loadProducts()
      }, [])

    if(loading){
        return <h1>Loading...</h1>
    }

    return <ProductGrid products={products} />

}