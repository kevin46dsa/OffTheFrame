import { useCart } from '../../service/cart/useCart'

export function CartSidebar() {
  const { items, addItem, removeItem, clearCart } = useCart()

  const handleCheckout = () => {
    window.location.href = '/checkout'
  }

  if (items.length === 0) {
    return (
      <aside>
        <h2>Cart</h2>
        <p>Your cart is empty</p>
      </aside>
    )
  }

  return (
    <aside>
      <h2>Cart</h2>

      <ul>
        {items.map(item => (
          <li key={item.product.id}>
            <div>
              <strong>{item.product.title}</strong>
            </div>

            <div>
              <button onClick={() => removeItem(item.product.id)}>
                -
              </button>

              <span>{item.quantity}</span>

              <button onClick={() => addItem(item.product)}>
                +
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={clearCart}>Clear Cart</button>
      {items.length > 0 && (
        <button onClick={handleCheckout}>Checkout</button>
      )}
    </aside>
  )
}
