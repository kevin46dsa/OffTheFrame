import {useState} from 'react'
import { OrderInfo, OrderDetails, PurchaseComplete } from '../components'


/**
 * Checkout page component
 * @returns Checkout page
 */
export default function Checkout() {
    
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false)
    const [orderInfo, setOrderInfo] = useState({
        email: '',
        promoCode: ''
      })


    return (
        <div>
            {!isOrderConfirmed && (
                <>
                <h1>Checkout</h1>
                    <OrderDetails />
                    <OrderInfo orderInfo={orderInfo} setOrderInfo={setOrderInfo} setIsOrderConfirmed={setIsOrderConfirmed} />
                </>
                )}

                {isOrderConfirmed && (
                    <PurchaseComplete/>
                )}

        </div>
    )
}   