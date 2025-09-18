import { Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
export default function AuthHeader() {
  return (
    <Navbar className="bg-black text-white" maxWidth="full" isBordered>
      <NavbarContent justify="start">
        <NavbarBrand>
          <p className="font-bold text-2xl text-inherit">React Shop</p>
        </NavbarBrand>
      </NavbarContent>
    </Navbar>
  );
}
