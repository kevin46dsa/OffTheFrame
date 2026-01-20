
export type orderInfo = {
    firstName: string,
    lastName: string,
    email: string,
}



export interface OrderInfoProps {
    orderInfo: orderInfo
    setOrderInfo: (orderInfo: orderInfo) => void
    onSubmit: () => void
}