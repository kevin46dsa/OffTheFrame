import { ProductGrid } from './Layout/ProductGrid'
import { getAllProducts } from '../../data/url'
import { useEffect, useState } from 'react'


export function AllProducts() {

    const [products, setProducts] = useState([])

    useEffect(() => {
      async function fetchProducts() {
        try {
          const response = await fetch(getAllProducts);
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Failed to fetch products:', error);
        }
      }
      fetchProducts();
    }, [])

    return <ProductGrid products={products} />

}