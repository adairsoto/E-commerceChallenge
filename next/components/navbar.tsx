import {
  Navbar as AppNavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { TbBrandNextjs } from "react-icons/tb";
import Link from "next/link";

export const Navbar = () => {
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
          <span className="text-gray-700">Next Store</span>
        </div>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem as={Link} href="orders">
          Orders
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem as={Link} href="cart">
          Cart
        </NavbarItem>
        <Button className="text-white" variant="bordered">
          Login
        </Button>
      </NavbarContent>
    </AppNavbar>
  );
};
