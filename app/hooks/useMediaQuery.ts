import { useElementSize } from "@/app/hooks/useElementWidth";
import { useBodyDivContext } from "@/app/providers/BodyDivContext";

const minMd = 768;

export const useIsMd = () => {
  const bodyDiv = useBodyDivContext();
  const { width } = useElementSize(bodyDiv);

  return width ?? 0 >= minMd;
};
