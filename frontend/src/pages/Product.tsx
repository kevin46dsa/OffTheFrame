import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../data/productData'
import { ProductInfo, ProductMedia } from '../components/Product'
import { ProductNotFound } from '../components/NotFound'

export default function Product() {
    const { id } = useParams()

    // TODO: fetch product data from API
    const product = products.find(product => product.id === id)

    if (!product) {
        return <ProductNotFound />
    }

    // TODO: Add a useEffect to triger a page view event
    useEffect(() => {
        console.log('Product page viewed', id, 'Triggered from Product Page')
    }, [])

    return (
        <div>
            <h1>Product</h1>
            <ProductInfo  productData={product}/>
            <ProductMedia productData={product}/>
        </div>
    )
}   