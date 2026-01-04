import type { OrderInfoProps } from '../../types'
import { PROMO_CODE } from '../../data/promoCode'

export function OrderInfo(props: OrderInfoProps) {
    const { orderInfo, setOrderInfo, setIsOrderConfirmed } = props
    const handleSubmit = () => {
        if(orderInfo.email && orderInfo.promoCode === PROMO_CODE) setIsOrderConfirmed(true)
        else setIsOrderConfirmed(false)
    }

    return (
        <div>
            <h2>Order Info</h2>
            <input type="email" required value={orderInfo.email} onChange={(e) => setOrderInfo({ ...orderInfo, email: e.target.value })} />
            <input type="text" value={orderInfo.promoCode} onChange={(e) => setOrderInfo({ ...orderInfo, promoCode: e.target.value })} />
            <button onClick={handleSubmit}>Place Order...</button>
        </div>
    )
}