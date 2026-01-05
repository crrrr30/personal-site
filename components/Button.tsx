"use client";

import { IconArrowUpRight } from "justd-icons";
import Link from "next/link";
import { Button as NativeButton } from "react-aria-components";

import { appEasingClass, appEasingCss } from "@/lib/animations";
import { cn } from "@/lib/utils";

const VARIANT_BASE =
  "px-8 py-3 flex justify-center items-center group opacity-100 hover:opacity-90 transition-opacity";

export const Button: React.FC<
  Parameters<typeof NativeButton>[0] & {
    href?: string;
    variant?: "primary" | "outline" | "plain";
    target?: React.HTMLAttributeAnchorTarget;
    rel?: string;
  }
> = ({
  children,
  variant = "primary",
  className,
  href,
  target,
  rel,
  ...props
}) => {
  const content = (
    <>
      {children}
      {["primary", "outline"].includes(variant) ? (
        <span className="w-0 group-hover:w-8 transition-all overflow-hidden">
          <IconArrowUpRight aria-hidden="true" className="ml-auto size-4" />
        </span>
      ) : null}
    </>
  );

  const variantClasses =
    variant === "plain"
      ? undefined
      : cn(
          VARIANT_BASE,
          appEasingClass,
          variant === "primary"
            ? "bg-brand text-white"
            : variant === "outline"
              ? "bg-transparent text-brand border border-brand"
              : undefined,
        );

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    const resolvedTarget = target ?? (isExternal ? "_blank" : undefined);
    const resolvedRel =
      rel ?? (resolvedTarget === "_blank" ? "noreferrer" : undefined);

    return (
      <Link
        className={cn(variantClasses, className)}
        href={href}
        rel={resolvedRel}
        target={resolvedTarget}
      >
        {content}
      </Link>
    );
  }

  return (
    <NativeButton className={cn(variantClasses, className)} {...props}>
      {content}
    </NativeButton>
  );
};

export const TextButton: React.FC<
  Parameters<typeof NativeButton>[0] & {
    text: string;
    variant?: "primary" | "outline" | "plain";
    offsetIncrement?: number;
  }
> = ({ offsetIncrement = 0.01, text, variant, ...props }) => {
  const { ["aria-label"]: ariaLabelProp, className, ...buttonProps } = props;
  const ariaLabel = ariaLabelProp ?? text;

  const chars = text.split("").map((char, index) => (
    <span
      key={`${index}-${char}`}
      className="staggering-char"
      style={{
        display: "inline-block",
        lineHeight: "1.5em",
        textShadow: "0px 1.5em currentColor",
        whiteSpace: char === " " ? "pre" : undefined,
        transition: `transform 0.6s ${appEasingCss} ${index * offsetIncrement}s`,
      }}
    >
      {char}
    </span>
  ));

  return (
    <>
      <Button
        aria-label={ariaLabel}
        className={cn("staggering", className)}
        variant={variant}
        {...buttonProps}
      >
        <span
          aria-hidden="true"
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            display: "inline-block",
          }}
        >
          {chars}
        </span>
        <span className="sr-only">{ariaLabel}</span>
      </Button>

      <style>
        {`
        .staggering:hover span .staggering-char {
          transform: translateY(-1.5em);
        }
        `}
      </style>
    </>
  );
};
