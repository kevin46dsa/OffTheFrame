import { useCart } from '../../service/cart/useCart'

export function OrderDetails( ) {
  const { items, addItem, removeItem} = useCart()

  return (
    <aside>
      <h2>Order Details</h2>

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
    </aside>
  )
}
