import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import NavbarLinks from "./navbar-links";

export default function SmallNavBar() {
  return (
    <Navbar className="flex md:hidden bg-dark" height="6rem" position="static">
      <NavbarContent className="flex justify-between">
        <NavbarBrand>
          <Link href="/" className="orpheus text-2xl">
            Jonathan Cui
          </Link>
        </NavbarBrand>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="bg-dark">
        {NavbarLinks().map((item, index) => (
          <NavbarMenuItem
            key={`small-${index}`}
            className="py-2 list-none text-base"
          >
            {item}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
