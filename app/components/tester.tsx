import { motion } from "motion/react";
import React from "react";

const textMotion = {
  rest: {
    color: "grey",
    x: 0,
    transition: {
      duration: 2,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    color: "blue",
    x: 30,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const slashMotion = {
  rest: { opacity: 0, ease: "easeOut", duration: 0.2, type: "tween" },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeIn",
    },
  },
};

const HoverTest = () => {
  return (
    <Container animate="rest" initial="rest" whileHover="hover">
      <SlashContainer variants={slashMotion}>
        <svg height="1em" viewBox="0 0 27 50" width="1em">
          <path
            d="M21.177 0L0 50h5.818L26.995 0z"
            fill="#154FFF"
            fillRule="evenodd"
          />
        </svg>
      </SlashContainer>
      <motion.h1 variants={textMotion}>Hover me!</motion.h1>
    </Container>
  );
};

export default HoverTest;

const Container = ({ ...props }) => (
  <motion.div
    style={{
      position: "relative",
      maxWidth: "200px",
      cursor: "pointer",
    }}
    {...props}
  />
);

const SlashContainer = ({ children, style, ...props }) => (
  <motion.div
    style={{
      position: "absolute",
      top: "50%",
      left: 0,
      opacity: 0,
      transform: "translateY(-50%)",
      ...style,
    }}
    {...props}
  >
    {React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? React.cloneElement(child, {
            style: {
              width: "auto",
              height: "50px",
              objectFit: "scale-down",
              ...child.props.style,
            },
          })
        : child,
    )}
  </motion.div>
);
