import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Shop, Product, Checkout, Analytics } from './pages'
import { CartSidebar, InvalidPage } from './components'
import { CartProvider } from './service/cart/cartContext'

export default function App() {

  return (
    <CartProvider>
      <CartSidebar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/analytics' element={<Analytics />} />

        <Route
          path='*'
          element={<InvalidPage />}
        />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}
