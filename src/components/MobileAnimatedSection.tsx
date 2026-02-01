import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationType =
  | "slideFromLeft"
  | "slideFromRight"
  | "slideFromBottom"
  | "slideFromTop"
  | "scaleUp"
  | "cardStack"
  | "fadeUp";

interface MobileAnimatedSectionProps {
  children: React.ReactNode;
  animation?: AnimationType;
  className?: string;
  delay?: number;
  as?: "div" | "section";
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const slideFromLeftVariants = {
  hidden: { opacity: 0, x: -80 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const slideFromRightVariants = {
  hidden: { opacity: 0, x: 80 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const slideFromBottomVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const slideFromTopVariants = {
  hidden: { opacity: 0, y: -60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

const cardStackVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: i * 0.12,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
};

export function MobileAnimatedSection({
  children,
  animation = "fadeUp",
  className = "",
  delay = 0,
  as: Component = "div",
}: MobileAnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const getVariants = () => {
    switch (animation) {
      case "slideFromLeft":
        return slideFromLeftVariants;
      case "slideFromRight":
        return slideFromRightVariants;
      case "slideFromBottom":
        return slideFromBottomVariants;
      case "slideFromTop":
        return slideFromTopVariants;
      case "scaleUp":
        return scaleUpVariants;
      case "cardStack":
        return cardStackVariants;
      default:
        return fadeUpVariants;
    }
  };

  const MotionComponent = Component === "section" ? motion.section : motion.div;

  return (
    <MotionComponent
      ref={ref as React.RefObject<HTMLDivElement>}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      custom={delay}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

export function MobileAnimatedCard({
  children,
  index = 0,
  direction = "left",
  className = "",
}: {
  children: React.ReactNode;
  index?: number;
  direction?: "left" | "right" | "bottom";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const x = direction === "left" ? -60 : direction === "right" ? 60 : 0;
  const y = direction === "bottom" ? 80 : 0;

  const springProps = useSpring({
    opacity: isInView ? 1 : 0,
    x: isInView ? 0 : x,
    y: isInView ? 0 : y,
    scale: isInView ? 1 : 0.9,
    config: { tension: 100, friction: 15 },
    delay: index * 80,
  });

  // On desktop: no animation, just render children
  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <animated.div
      ref={ref}
      style={{
        opacity: springProps.opacity,
        transform: springProps.x.to(
          (xVal: number) =>
            springProps.y.to(
              (yVal: number) =>
                springProps.scale.to(
                  (s: number) => `translate(${xVal}px, ${yVal}px) scale(${s})`
                )
            )
        ),
      }}
      className={className}
    >
      {children}
    </animated.div>
  );
}
