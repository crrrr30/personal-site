import { useSyncExternalStore } from "react";

let vhPx = computeVh();
const listeners = new Set<() => void>();
let listening = false;

function computeVh() {
  return typeof window === "undefined" ? 0 : window.innerHeight * 0.01;
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (!listening && typeof window !== "undefined") {
    listening = true;

    const onResize = () => {
      const next = computeVh();

      if (next !== vhPx) {
        vhPx = next;
        listeners.forEach((l) => l());
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
  }

  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return vhPx;
}

export function useVh() {
  return useSyncExternalStore(subscribe, getSnapshot, () => 0);
}
