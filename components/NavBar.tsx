"use client";

import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { type FC } from "react";

import { BlurFade } from "@/components/BlurFade";
import Link from "@/components/Link";
import { blogsLink, portfolioLink, resumeLink } from "@/lib/links";
import { cn } from "@/lib/utils";

export const links: { text: string; href: string }[] = [
  { text: "Home", href: "/" },
  { text: "Blogs", href: blogsLink },
  { text: "Résumé", href: resumeLink },
  { text: "Portfolio", href: portfolioLink },
] as const;

export function NavBar() {
  return (
    <>
      <nav className="hidden md:flex flex-row justify-between px-page py-8">
        <BlurFade offset="2em">
          <p>BEHIND THE SCREEN</p>
        </BlurFade>

        <span className="flex flex-row gap-32">
          {links.map(({ text, href }, index) => (
            <BlurFade key={href} delay={0.2 * (index + 1)}>
              <Link href={href} variant="inverted">
                {text}
              </Link>
            </BlurFade>
          ))}
        </span>
      </nav>
      <SmallNavBar className="flex md:hidden" />
    </>
  );
}

const SmallNavBar: FC<{ className?: string }> = ({ className }) => {
  return (
    <Navbar
      className={cn("bg-gray-100", className)}
      height="6rem"
      position="static"
    >
      <BlurFade className="w-full">
        <NavbarContent className="flex justify-between">
          <NavbarBrand>
            <Link
              className="serif tracking-normal text-lg"
              href="/"
              variant="plain"
            >
              BEHIND THE SCREEN
            </Link>
          </NavbarBrand>

          <NavbarMenuToggle className="size-6" />
        </NavbarContent>
      </BlurFade>

      <NavbarMenu className="bg-transparent">
        {links.map(({ text, href }, index) => (
          <BlurFade key={href} delay={0.2 * (index + 1)}>
            <NavbarMenuItem className="py-2 list-none text-base">
              <Link href={href} variant="inverted">
                {text}
              </Link>
            </NavbarMenuItem>
          </BlurFade>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
