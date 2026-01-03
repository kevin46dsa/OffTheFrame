import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Shop, Product, Checkout, Analytics } from './pages'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/analytics' element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  )
}
