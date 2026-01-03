import type { ProductInfoProps } from '../../types/productPageInterfaces'
export function ProductInfo(props: ProductInfoProps) {
    const { productData } = props
    return (
        <div>
            <h1>Product Info</h1>
            <p>{productData.title}</p>
            <p>{productData.description}</p>
            <p>{productData.artist}</p>
            <p>{productData.category}</p>
            <p>{productData.price}</p>
            <p>{productData.isFeatured}</p>
            <p>{productData.keywords}</p>
        </div>
    )
}
