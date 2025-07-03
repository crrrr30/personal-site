import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import Link from "./link";

export function LargeNavBar() {
  return (
    <div className="hidden md:flex flex-row h-32 justify-between items-center px-32">
      <a href="/" className="serif tracking-normal text-3xl">
        Jonathan Cui
      </a>
      <div className="flex gap-16">
        {NavbarLinks().map((item, index) => (
          <div key={`small-${index}`}>{item}</div>
        ))}
      </div>
    </div>
  );
}

export function SmallNavBar() {
  return (
    <Navbar className="flex md:hidden bg-dark" height="6rem" position="static">
      <NavbarContent className="flex justify-between">
        <NavbarBrand>
          <a href="/" className="serif tracking-normal text-2xl">
            Jonathan Cui
          </a>
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

export function NavbarLinks() {
  return [
    <Link key={1} href="/" variant="inverted">
      Home
    </Link>,
    <Link key={2} href="https://sites.psu.edu/jonathancui" variant="inverted">
      Blogs
    </Link>,
    <Link key={3} href="/assets/files/Resume.pdf" variant="inverted">
      Résumé
    </Link>,
    <Link
      key={4}
      href="https://sway.office.com/qHuaPGQEKeIjePnJ"
      variant="inverted"
    >
      Portfolio
    </Link>,
  ];
}
