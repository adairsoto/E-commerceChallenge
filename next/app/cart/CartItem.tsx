import { Image } from "@heroui/image";
import { CiSquareRemove } from "react-icons/ci";

import { useRemoveCartItemMutation } from "./cartApi";

import { CartItem as Item } from "@/models/cart";
import { useAppSelector } from "@/store/store";

type Props = {
  cartItem: Item;
};

export default function CartItem({ cartItem }: Props) {
  const { cartId } = useAppSelector((state) => state.cart);
  const [removeCartItem] = useRemoveCartItemMutation();

  return (
    <div className="flex space-x-10 w-full justify-between bg-slate-500 rounded-xl">
      <div className="flex space-x-10">
        <Image
          isZoomed
          alt={cartItem.title}
          className="aspect-square"
          src={cartItem.image}
          width={80}
        />
        <span className="max-w-96 self-center">{cartItem.title}</span>
      </div>
      <div className="flex space-x-10">
        <span className="self-center">
          ${cartItem.price} x {cartItem.quantity}
        </span>
        <CiSquareRemove
          className="cursor-pointer"
          size={30}
          onClick={() =>
            removeCartItem({
              cartId: +cartId!,
              productId: cartItem.productId,
              quantity: cartItem.quantity,
            })
          }
        />
      </div>
    </div>
  );
}
