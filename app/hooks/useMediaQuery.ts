import { useElementWidth } from "@/app/hooks/useElementWidth";
import { useBodyDivContext } from "@/app/providers/BodyDivContext";

const minMd = 768;

export const useIsMd = () => {
  const bodyDiv = useBodyDivContext();
  const { width } = useElementWidth(bodyDiv);

  return width ?? 0 >= minMd;
};
