import { cn } from "@/lib/utils";
import { IconArrowUpRight } from "justd-icons";
import { Button as NativeButton } from "react-aria-components";

const Button: React.FC<
  Parameters<typeof NativeButton>[0] & {
    href: string | undefined;
    variant?: "dark" | "light";
  }
> = ({ children, variant = "dark", className, href, ...props }) => {
  if (href !== undefined) {
    props.onPress = () => window.open(href);
  }

  return (
    <NativeButton
      className={cn(
        className,
        "group w-48 h-16 flex justify-center items-center font-[300]",
        variant == "light"
          ? "bg-white opacity-100 hover:opacity-90 transition-opacity text-black"
          : "bg-[#28354f] opacity-100 hover:opacity-90 transition-opacity text-white"
      )}
      {...props}
    >
      <>
        {children}
        <span className="w-0 group-hover:w-8 transition-all overflow-hidden">
          <IconArrowUpRight className="ml-auto size-4" />
        </span>
      </>
    </NativeButton>
  );
};

export default Button;
