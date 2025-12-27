"use client";

import { motion } from "motion/react";
import { useEffect, useId, useState, type FC } from "react";

import { BlurFade } from "@/components/BlurFade";
import Link from "@/components/Link";
import { appEasing } from "@/lib/animations";
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
      <nav
        aria-label="Primary navigation"
        className="hidden md:flex flex-row justify-between px-page py-8"
      >
        <BlurFade offset="2em">
          <p>BEHIND THE SCREEN</p>
        </BlurFade>

        <ul className="flex flex-row md:gap-16 lg:gap-32 list-none">
          {links.map(({ text, href }, index) => (
            <li key={href}>
              <BlurFade delay={0.2 * (index + 1)}>
                <Link href={href} variant="inverted">
                  {text}
                </Link>
              </BlurFade>
            </li>
          ))}
        </ul>
      </nav>
      <SmallNavBar className="flex md:hidden" />
    </>
  );
}

const SmallNavBar: FC<{ className?: string }> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const srText = open ? "Close navigation menu" : "Open navigation menu";

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        "h-[6rem] justify-between items-center px-page",
        "relative",
        className,
      )}
    >
      <Link className="serif tracking-normal text-lg" href="/" variant="plain">
        BEHIND THE SCREEN
      </Link>

      <button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={srText}
        className="group size-6 rounded-small focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/80"
        data-open={open}
        type="button"
        onClick={() => setOpen((old) => !old)}
      >
        <span className="sr-only">{srText}</span>
        <NavToggle />
      </button>

      <motion.div
        animate={open ? "open" : "collapsed"}
        aria-hidden={!open}
        className={cn(
          "fixed top-[6rem] left-0 right-0 overflow-clip",
          "px-page",
          "bg-gray-100/25 backdrop-blur-lg z-[9999]",
        )}
        id={menuId}
        initial="collapsed"
        transition={{
          duration: 1,
          ...appEasing,
        }}
        variants={{
          open: {
            height: "calc(100vh - 6rem)",
          },
          collapsed: {
            height: 0,
          },
        }}
      >
        <ul className="flex flex-col list-none">
          {links.map(({ text, href }, index) => (
            <li key={`${text}-${index}`} className="py-4">
              <BlurFade delay={0.1 * index}>
                <Link href={href} tabIndex={open ? 0 : -1} variant="inverted">
                  {text}
                </Link>
              </BlurFade>
            </li>
          ))}
        </ul>
      </motion.div>
    </nav>
  );
};

const NavToggle: FC = () => (
  <span
    aria-hidden="true"
    className={cn(
      ...[
        "group",
        "w-full",
        "h-full",
        "pointer-events-none",
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "text-inherit",
        "group-data-[pressed=true]:opacity-70",
        "transition-opacity",
        // before - first line
        "before:block",
        "before:h-px",
        "before:w-6",
        "before:bg-current",
        "before:transition-transform",
        "before:duration-150",
        "before:-translate-y-1",
        "before:rotate-0",
        "group-data-[open=true]:before:translate-y-px",
        "group-data-[open=true]:before:rotate-45",
        // after - second line
        "after:block",
        "after:h-px",
        "after:w-6",
        "after:bg-current",
        "after:transition-transform",
        "after:duration-150",
        "after:translate-y-1",
        "after:rotate-0",
        "group-data-[open=true]:after:translate-y-0",
        "group-data-[open=true]:after:-rotate-45",
      ],
    )}
  />
);
