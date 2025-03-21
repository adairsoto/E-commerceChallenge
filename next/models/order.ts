export type Order = {
  id?: number;
  customerEmail: string;
  orderItems: OrderItem[];
  total: number;
  createdAt: string;
};

export type OrderItem = {
  productTitle: string;
  quantity: number;
};
