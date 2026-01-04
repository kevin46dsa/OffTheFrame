import { useCart } from '../../service/cart/useCart'

export function PurchaseComplete() {
    const { items} = useCart()

    return (
        <div>
            <h1>Purchase Complete</h1>
            <h2>Thank you for your order...</h2>
            <p>Yur order should begin Downloading in a few seconds...</p>
            <p> If you don't receive your download in a few minutes, Use the button below</p>
            {items.map(item => <a href={item.product.images.download} download>
  {item.product.title}
</a>)}
        </div>
    )
}