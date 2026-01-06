import { createOrderData } from "../dataAccessLayer";
import type { Order } from "../models";

export async function createOrder(order:Order): Promise<Order> {
  return await createOrderData(order)
}