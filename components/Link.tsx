import NextLink from "next/link";

import { cn } from "@/lib/utils";

import "@/styles/link.css";

const Link: React.FC<
  Parameters<typeof NextLink>[0] & {
    variant?: "underlined" | "inverted" | "plain";
  }
> = ({ children, className, variant = "underlined", ...prop }) => {
  return (
    <NextLink
      className={cn(
        className,
        ["underlined", "inverted"].includes(variant) && variant + "-link",
      )}
      {...prop}
    >
      {children}
    </NextLink>
  );
};

export default Link;
