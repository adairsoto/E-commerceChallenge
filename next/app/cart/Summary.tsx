import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import Link from "next/link";

import { useAddOrderMutation } from "../orders/orderApi";

import { CartItem } from "@/models/cart";
import { Order } from "@/models/order";

type Props = {
  cartItems: CartItem[];
};

export default function Summary({ cartItems }: Props) {
  const [addOrder] = useAddOrderMutation();

  const subtotal =
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const deliveryFee = subtotal > 200 ? 0 : 10;
  const total = subtotal + deliveryFee;

  const handleOrder = () => {
    const order: Order = {
      customerEmail: "bob@email.com",
      orderItems: cartItems.map((item) => ({
        productTitle: item.title,
        quantity: item.quantity,
      })),
      total: total,
    };

    return order;
  };

  return (
    <div className="flex flex-col space-y-5 bg-slate-500 rounded-xl p-5">
      <span className="self-center text-xl">Order summary</span>
      <span className="italic">
        Orders over $200 qualify for free delivery!
      </span>
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Delivery fee</span>
        <span>${deliveryFee}</span>
      </div>
      <Divider />
      <div className="flex justify-between">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <Button color="secondary" onPress={() => addOrder(handleOrder())}>
        Checkout
      </Button>
      <Button as={Link} color="secondary" href="catalog" variant="faded">
        Continue Shopping
      </Button>
    </div>
  );
}
