"use client";

import { useFetchCartQuery } from "./cartApi";
import CartItem from "./CartItem";
import Summary from "./Summary";

import { useAppSelector } from "@/store/store";

export default function CartPage() {
  const { cartId } = useAppSelector((state) => state.cart);
  const { data: cart, isLoading } = useFetchCartQuery(+cartId!, {
    skip: cartId === null,
  });

  if (isLoading) return <div>Loading cart...</div>;

  if (!cart) return <div>Your cart is empty</div>;

  return (
    <div className="flex mt-10">
      <div className="flex flex-col space-y-5 w-1/2">
        {cart.items.map((item) => (
          <CartItem key={item.productId} cartItem={item} />
        ))}
      </div>
      <div className="mx-auto">
        <Summary cartItems={cart.items} />
      </div>
    </div>
  );
}
