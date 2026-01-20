import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Shop, Product, Checkout, Analytics } from './pages'
import { useAnalyticsIdentity } from './hooks'
import { setAnalyticsIdentity } from './utils'
import { CartSidebar, InvalidPage, Navbar, PurchaseComplete } from './components'
import { CartProvider } from './service/cart/cartContext'
import { CartUiProvider } from './service/cart/cartUiContext'
import { OrderProvider } from './service/order/OrderProvider'

export default function App() {
  // Get the analytics identity from the useAnalyticsIdentity hook
  const { isReady, anonUserId, sessionId } = useAnalyticsIdentity()

  // If the analytics identity is not ready, show a loading component
  if (!isReady || !anonUserId || !sessionId) {
    // TODO: Add a loading component
    return <div>Loading...</div>
  }

  // Set the analytics identity in the utils
  setAnalyticsIdentity(anonUserId, sessionId)

  return (

    <CartProvider>
          <OrderProvider>
      <CartUiProvider>
    <BrowserRouter>
    <Navbar/>
    <CartSidebar />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path="/order/complete/:orderId" element={<PurchaseComplete />} />
        <Route path='/analytics' element={<Analytics />} />

        <Route
          path='*'
          element={<InvalidPage />}
        />
        </Routes>
      </BrowserRouter>
      </CartUiProvider>
      </OrderProvider>
    </CartProvider>
   
  )
}
