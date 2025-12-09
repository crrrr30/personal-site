"use client";

import { IconArrowUpRight } from "justd-icons";
import { Button as NativeButton } from "react-aria-components";

import { cn } from "@/lib/utils";

export const Button: React.FC<
  Parameters<typeof NativeButton>[0] & {
    href?: string;
    variant?: "primary" | "outline" | "plain";
  }
> = ({ children, variant = "primary", className, href, ...props }) => {
  if (href !== undefined) {
    props.onPress = () => window.open(href);
  }

  return (
    <NativeButton
      className={
        variant !== "plain"
          ? cn(
              "px-8 py-3 flex justify-center items-center",
              "group",
              "opacity-100 hover:opacity-90 transition-opacity",
              variant === "primary"
                ? "bg-brand text-white"
                : variant === "outline"
                  ? "bg-transparent text-brand border border-brand"
                  : undefined,
              className,
            )
          : undefined
      }
      {...props}
    >
      <>
        {children}
        {["primary", "outline"].includes(variant) ? (
          <span className="w-0 group-hover:w-8 transition-all overflow-hidden">
            <IconArrowUpRight className="ml-auto size-4" />
          </span>
        ) : null}
      </>
    </NativeButton>
  );
};
