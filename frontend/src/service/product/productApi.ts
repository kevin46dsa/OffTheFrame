const API = import.meta.env.VITE_API_URL

export async function fetchAllProducts() {
  const res = await fetch(`${API}/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function fetchProductById(id: string) {
  const res = await fetch(`${API}/products/${id}`)
  if (!res.ok) return null
  return res.json()
}
