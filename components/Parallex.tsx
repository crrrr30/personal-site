"use client";

import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

export function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Item() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center end", "center center"],
  });

  return (
    <section style={itemContainer}>
      <div ref={ref} style={item}>
        <figure style={progressIconContainer}>
          <svg
            height="75"
            style={progressIcon}
            viewBox="0 0 100 100"
            width="75"
          >
            <circle
              className="bg"
              cx="50"
              cy="50"
              pathLength="1"
              r="30"
              style={progressIconBg}
            />
            <motion.circle
              cx="50"
              cy="50"
              pathLength="1"
              r="30"
              style={{
                ...progressIconIndicator,
                pathLength: scrollYProgress,
              }}
            />
          </svg>
        </figure>
      </div>
    </section>
  );
}

export default function TrackElementWithinViewport() {
  return (
    <>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </>
  );
}

/**
 * ==============   Styles   ================
 */

const itemContainer: React.CSSProperties = {
  height: "100vh",
  maxHeight: "400px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const progressIconContainer: React.CSSProperties = {
  position: "sticky",
  top: 0,
  width: 80,
  height: 80,
  margin: 0,
  padding: 0,
};

const processCircle: React.CSSProperties = {
  strokeDashoffset: 0,
  strokeWidth: 5,
  fill: "none",
};

const progressIcon: React.CSSProperties = {
  ...processCircle,
  transform: "translateX(-100px) rotate(-90deg)",
  stroke: "#ff0088",
};

const progressIconIndicator: React.CSSProperties = {
  ...processCircle,
  strokeDashoffset: 0,
  strokeWidth: 5,
  fill: "none",
};

const progressIconBg: React.CSSProperties = {
  opacity: 0.2,
};

const item: React.CSSProperties = {
  width: 200,
  height: 250,
  border: "2px dotted #ff0088",
  position: "relative",
};
