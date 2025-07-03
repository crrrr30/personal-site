import { cn } from "@/lib/utils";
import { Link as UnstyledLink } from "react-aria-components";
import "./link.css";

const Link: React.FC<
  Parameters<typeof UnstyledLink>[0] & {
    variant?: "black" | "white" | "inverted";
  }
> = ({ children, className, variant = "black", ...prop }) => {
  return (
    <UnstyledLink className={cn(className, variant + "-link")} {...prop}>
      {children}
    </UnstyledLink>
  );
};

export default Link;
