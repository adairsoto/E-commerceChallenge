import { ProductDto } from "./product";

export type Cart = {
  id: number;
  items: CartItem[];
};

export type CartItem = {
    productId: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
};

export type CartRequest = {
    product: ProductDto;
    quantity: number;
    cartId?: number;
}
