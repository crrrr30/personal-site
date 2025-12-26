"use client";

import { IconArrowUpRight } from "justd-icons";
import { Button as NativeButton } from "react-aria-components";

import { appEasingClass, appEasingCss } from "@/lib/animations";
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
              `opacity-100 hover:opacity-90 transition-opacity`,
              appEasingClass,
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

export const TextButton: React.FC<
  Parameters<typeof NativeButton>[0] & {
    text: string;
    variant?: "primary" | "outline" | "plain";
    offsetIncrement?: number;
  }
> = ({ offsetIncrement = 0.01, text, variant, ...props }) => {
  const { ["aria-label"]: ariaLabelProp, ...buttonProps } = props;
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
        className="staggering"
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
