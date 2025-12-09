import {
  motion,
  useInView,
  type Target,
  type Transition,
  type Variants,
} from "motion/react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type InViewOptions = Parameters<typeof useInView>[1];
type MarginType =
  NonNullable<InViewOptions> extends { margin?: infer M } ? M : string;

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  splitDelay?: number;
  duration?: number;
  ease?: string | Transition["ease"];
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: Target;
  to?: Target;
  threshold?: number;
  rootMargin?: MarginType;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: React.CSSProperties["textAlign"];
  overflow?: React.CSSProperties["overflow"];
  onLetterAnimationComplete?: () => void;
}

type AnimationLevel = "chars" | "words" | "lines";

type SplitToken =
  | { type: "char" | "word" | "line"; key: string; text: string; order: number }
  | { type: "space"; key: string; text: string }
  | { type: "line-break"; key: string };

interface BuildTokensResult {
  tokens: SplitToken[];
  animatedCount: number;
}

const determineAnimationLevel = (
  splitType: SplitTextProps["splitType"] = "chars",
): AnimationLevel => {
  const normalized = splitType.toLowerCase();

  if (normalized.includes("chars")) {
    return "chars";
  }

  if (normalized.includes("words")) {
    return "words";
  }

  return "lines";
};

const nbsp = "\u00A0";

const convertWhitespace = (value: string) =>
  value.replace(/ /g, nbsp).replace(/\t/g, `${nbsp}${nbsp}`);

const buildTokens = (
  text: string,
  level: AnimationLevel,
): BuildTokensResult => {
  const tokens: SplitToken[] = [];
  let animatedOrder = 0;
  let tokenIndex = 0;
  const pushLineBreak = () => {
    tokens.push({ type: "line-break", key: `line-break-${tokenIndex++}` });
  };
  const pushSpace = (segment: string) => {
    tokens.push({
      type: "space",
      key: `space-${tokenIndex++}`,
      text: convertWhitespace(segment),
    });
  };
  const pushAnimated = (type: "char" | "word" | "line", content: string) => {
    tokens.push({
      type,
      key: `${type}-${tokenIndex++}`,
      text: content || nbsp,
      order: animatedOrder++,
    });
  };

  const handleLineLevel = (lineText: string) => {
    pushAnimated("line", convertWhitespace(lineText) || nbsp);
  };

  const handleWordLevel = (lineText: string) => {
    const parts = lineText.split(/(\s+)/);
    let hasWord = false;

    parts.forEach((part) => {
      if (part && /^\s+$/.test(part)) {
        pushSpace(part);
      } else if (part) {
        hasWord = true;
        pushAnimated("word", part);
      }
    });

    if (!hasWord) {
      pushAnimated("word", nbsp);
    }
  };

  const handleCharLevel = (lineText: string) => {
    const chars = Array.from(lineText);

    if (!chars.length) {
      pushAnimated("char", nbsp);
    }

    chars.forEach((char) => {
      if (char) {
        pushAnimated("char", convertWhitespace(char));
      }
    });
  };

  const handlers: Record<AnimationLevel, (lineText: string) => void> = {
    chars: handleCharLevel,
    lines: handleLineLevel,
    words: handleWordLevel,
  };

  const processLine = handlers[level] ?? handleCharLevel;
  const lines = text.split(/\r?\n/);

  lines.forEach((lineText, lineIndex) => {
    processLine(lineText);

    lineIndex < lines.length - 1 && pushLineBreak();
  });

  return { tokens, animatedCount: animatedOrder };
};

const normalizeEase = (ease: SplitTextProps["ease"]): Transition["ease"] => {
  if (!ease) {
    return "easeOut";
  }

  if (typeof ease === "function") {
    return ease;
  }

  if (Array.isArray(ease)) {
    return ease;
  }

  if (typeof ease !== "string") {
    return ease;
  }

  const normalized = ease.toLowerCase();

  if (normalized.includes("inout")) {
    return "easeInOut";
  }

  if (normalized.includes("out")) {
    return "easeOut";
  }

  if (normalized.includes("in")) {
    return "easeIn";
  }

  if (normalized === "linear") {
    return "linear";
  }

  return "easeOut";
};

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 0,
  splitDelay = 20,
  duration = 0.5,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  overflow = "visible",
  tag = "p",
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const animationCompletedRef = useRef(false);
  const completedCountRef = useRef(0);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  const animationLevel = useMemo(
    () => determineAnimationLevel(splitType),
    [splitType],
  );

  const { tokens, animatedCount } = useMemo(
    () => buildTokens(text, animationLevel),
    [text, animationLevel],
  );

  const fromSignature = useMemo(() => JSON.stringify(from), [from]);
  const toSignature = useMemo(() => JSON.stringify(to), [to]);

  const hiddenState = useMemo<Target>(() => ({ ...from }), [fromSignature]);
  const visibleState = useMemo<Target>(() => ({ ...to }), [toSignature]);
  const variants = useMemo<Variants>(
    () => ({ hidden: hiddenState, visible: visibleState }),
    [hiddenState, visibleState],
  );

  const easing = useMemo(() => normalizeEase(ease), [ease]);
  const normalizedThreshold = Math.min(Math.max(threshold, 0), 1);

  const inViewOptions = useMemo<InViewOptions>(
    () => ({
      once: true,
      amount: normalizedThreshold === 0 ? 0.01 : normalizedThreshold,
      margin: rootMargin as MarginType,
    }),
    [normalizedThreshold, rootMargin],
  );

  const isInView = useInView(ref, inViewOptions);

  const assignRef = useCallback((node: HTMLElement | null) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    completedCountRef.current = 0;
    animationCompletedRef.current = false;
    setHasAnimated(false);
  }, [text, animationLevel, fromSignature, toSignature, duration, splitDelay]);

  useEffect(() => {
    if (!hasAnimated && fontsLoaded && isInView) {
      setHasAnimated(true);
    }
  }, [fontsLoaded, isInView, hasAnimated]);

  const handleTokenComplete = useCallback(() => {
    if (!hasAnimated || animatedCount === 0) return;
    completedCountRef.current += 1;
    if (
      completedCountRef.current >= animatedCount &&
      !animationCompletedRef.current
    ) {
      animationCompletedRef.current = true;
      onLetterAnimationComplete?.();
    }
  }, [animatedCount, hasAnimated, onLetterAnimationComplete]);

  const renderTag = () => {
    const style: React.CSSProperties = {
      textAlign,
      overflow,
      display: "inline-block",
      whiteSpace: "normal",
      wordWrap: "break-word",
      willChange: "transform, opacity",
    };
    const classes = `split-parent ${className}`;

    const content = tokens.map((token) => {
      if (token.type === "line-break") {
        return <br key={token.key} />;
      }

      if (token.type === "space") {
        return (
          <span
            key={token.key}
            aria-hidden="true"
            className="split-space"
            style={{ whiteSpace: "pre" }}
          >
            {token.text}
          </span>
        );
      }

      const delaySeconds = ((token.order ?? 0) * splitDelay) / 1000 + delay;
      const itemStyle: React.CSSProperties = {
        display: token.type === "line" ? "block" : "inline-block",
        whiteSpace: token.type === "line" ? "pre-wrap" : "inherit",
        willChange: "transform, opacity",
      };

      return (
        <motion.span
          key={token.key}
          animate={hasAnimated ? "visible" : "hidden"}
          className={`split-${token.type}`}
          initial="hidden"
          style={itemStyle}
          transition={{ duration, ease: easing, delay: delaySeconds }}
          variants={variants}
          onAnimationComplete={handleTokenComplete}
        >
          {token.text}
        </motion.span>
      );
    });

    switch (tag) {
      case "h1":
        return (
          <h1 ref={assignRef} className={classes} style={style}>
            {content}
          </h1>
        );
      case "h2":
        return (
          <h2 ref={assignRef} className={classes} style={style}>
            {content}
          </h2>
        );
      case "h3":
        return (
          <h3 ref={assignRef} className={classes} style={style}>
            {content}
          </h3>
        );
      case "h4":
        return (
          <h4 ref={assignRef} className={classes} style={style}>
            {content}
          </h4>
        );
      case "h5":
        return (
          <h5 ref={assignRef} className={classes} style={style}>
            {content}
          </h5>
        );
      case "h6":
        return (
          <h6 ref={assignRef} className={classes} style={style}>
            {content}
          </h6>
        );
      default:
        return (
          <p ref={assignRef} className={classes} style={style}>
            {content}
          </p>
        );
    }
  };

  return renderTag();
};

export default SplitText;
