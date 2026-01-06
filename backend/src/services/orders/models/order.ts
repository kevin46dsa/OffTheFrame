export type Order = {
  id: string
  userId: string
  items: { id: string, quantity: number }[]
  total: number
}