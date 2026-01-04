export interface OrderInfoProps {
    orderInfo: {
        email: string
        promoCode: string
    }
    setOrderInfo: (orderInfo: {
        email: string
        promoCode: string
    }) => void
    setIsOrderConfirmed: (isOrderConfirmed: boolean) => void
}