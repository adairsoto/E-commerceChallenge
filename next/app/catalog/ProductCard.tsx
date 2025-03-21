import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { useEffect } from "react";

import { useAddCartItemMutation } from "../cart/cartApi";
import { setCartId } from "../cart/cartSlice";

import { Product } from "@/models/product";
import { CartRequest } from "@/models/cart";
import { useAppDispatch, useAppSelector } from "@/store/store";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [addCartItem, { isLoading, data: cartId }] = useAddCartItemMutation();
  const { cartId: storedCardId } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!storedCardId && cartId) dispatch(setCartId(cartId));
  }, [cartId]);

  const handleAddItem = (product: Product) => {
    const cartRequest: CartRequest = {
      product: {
        productId: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
      },
      quantity: 1,
      cartId: storedCardId ? +storedCardId : undefined
    };

    return cartRequest;
  };

  return (
    <Card fullWidth>
      <Image
        isZoomed
        alt={product.title}
        className="aspect-square"
        src={product.image}
        width={300}
      />
      <CardFooter className="h-44">
        <div className="flex flex-col text-white text-center min-w-full min-h-full justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-center">{product.title}</span>
            <span className="font-semibold">${product.price}</span>
          </div>
          <Button
            color="secondary"
            disabled={isLoading}
            onPress={() => addCartItem(handleAddItem(product))}
          >
            Add to cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
