"use client";

import {
  Navbar as AppNavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { TbBrandNextjs } from "react-icons/tb";
import Link from "next/link";
import { GiShoppingCart } from "react-icons/gi";
import { Badge } from "@heroui/badge";

import { useAppSelector } from "@/store/store";
import { useFetchCartQuery } from "@/app/cart/cartApi";

export const Navbar = () => {
  const { cartId } = useAppSelector((state) => state.cart);
  const { data: cart } = useFetchCartQuery(+cartId!, { skip: cartId === null });

  const itemCount =
    cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <AppNavbar
      className="bg-gradient-to-r from-purple-400 to-purple-700"
      classNames={{
        item: ["text-xl", "text-white", "uppercase"],
      }}
      maxWidth="xl"
    >
      <NavbarBrand as={Link} href="/">
        <TbBrandNextjs className="text-gray-700" size={40} />
        <div className="font-bold text-2xl flex">
          <span className="text-gray-700">NextStore</span>
        </div>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem as={Link} href="catalog">
          Catalog
        </NavbarItem>
        <NavbarItem as={Link} href="orders">
          Orders
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem as={Link} href="cart">
          {cart ? (
            <Badge color="default" content={itemCount} variant="faded">
              <GiShoppingCart size={30} />
            </Badge>
          ) : (
            <GiShoppingCart size={30} />
          )}
        </NavbarItem>
        <Button className="text-white" variant="bordered">
          Login
        </Button>
      </NavbarContent>
    </AppNavbar>
  );
};
