import type { ProductMediaProps } from '../../types/productPageInterfaces'
export function ProductMedia(props: ProductMediaProps) {
    const { productData } = props
    return (
        <div>
            <h1>Product Media</h1>
            <img src={productData.images.primary} alt={productData.title} />
            <img src={productData.images.gallery[0]} alt={productData.title} />
        </div>
    )
}