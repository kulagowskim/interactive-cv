"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ScrollSVGProps = {
  type: "brackets" | "terminal" | "algorithm" | "code";
  color?: string;
  className?: string;
  width?: number;
  height?: number;
};

const ScrollSVG = ({
  type,
  color = "#3b82f6",
  className = "",
  width = 200,
  height = 200,
}: ScrollSVGProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const pathLength = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const horizontalMove = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-10, 10, -10]
  );
  const verticalMove = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 5, -5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 0.3]);

  const negativeHorizontalMove = useTransform(horizontalMove, (x) => -x);
  const verticalMove70 = useTransform(verticalMove, (y) => y * 0.7);
  const verticalMove50 = useTransform(verticalMove, (y) => y * 0.5);
  const verticalMove30 = useTransform(verticalMove, (y) => y * 0.3);
  const verticalMove10 = useTransform(verticalMove, (y) => y * 0.1);
  const terminalHeaderOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.1, 0.3, 0.1]
  );
  const algorithmRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const renderSVG = () => {
    switch (type) {
      case "brackets":
        return (
          <motion.svg
            viewBox="0 0 100 100"
            width={width}
            height={height}
            style={{ scale, opacity }}
          >
            {/* Left bracket */}
            <motion.path
              d="M30,10 C20,10 10,20 10,30 L10,70 C10,80 20,90 30,90"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              style={{
                pathLength,
                x: horizontalMove,
              }}
            />
            {/* Right bracket */}
            <motion.path
              d="M70,10 C80,10 90,20 90,30 L90,70 C90,80 80,90 70,90"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              style={{
                pathLength,
                x: negativeHorizontalMove,
              }}
            />
          </motion.svg>
        );

      case "terminal": // Terminal window with blinking cursor
        return (
          <motion.svg
            viewBox="0 0 100 100"
            width={width}
            height={height}
            style={{ scale, opacity }}
          >
            {/* Terminal window */}
            <motion.rect
              x="10"
              y="20"
              width="80"
              height="60"
              rx="3"
              fill="none"
              stroke={color}
              strokeWidth="2"
              style={{ pathLength }}
            />
            {/* Terminal header */}
            <motion.rect
              x="10"
              y="20"
              width="80"
              height="8"
              rx="3"
              fill={color}
              style={{ opacity: terminalHeaderOpacity }}
            />
            {/* Command prompt > */}
            <motion.path
              d="M20,40 L25,45 L20,50"
              fill="none"
              stroke={color}
              strokeWidth="2"
              style={{ pathLength }}
            />
            {/* Blinking cursor */}
            <motion.rect
              x="30"
              y="42"
              width="5"
              height="8"
              fill={color}
              animate={{
                opacity: [0.3, 1, 0.3],
                transition: {
                  repeat: Infinity,
                  duration: 1.5,
                },
              }}
            />
          </motion.svg>
        );

      case "algorithm": // Flowchart algorithm visualization
        return (
          <motion.svg
            viewBox="0 0 100 100"
            width={width}
            height={height}
            style={{ scale, opacity }}
          >
            {/* Start node */}
            <motion.rect
              x="35"
              y="10"
              width="30"
              height="15"
              rx="7.5"
              fill="none"
              stroke={color}
              strokeWidth="2"
              style={{ pathLength }}
            />
            {/* Vertical connecting line */}
            <motion.line
              x1="50"
              y1="25"
              x2="50"
              y2="35"
              stroke={color}
              strokeWidth="2"
              style={{ pathLength }}
            />
            {/* Decision diamond */}
            <motion.path
              d="M50,35 L65,50 L50,65 L35,50 Z"
              fill="none"
              stroke={color}
              strokeWidth="2"
              style={{
                pathLength,
                rotate: algorithmRotate,
              }}
            />
            {/* True path (right) */}
            <motion.path
              d="M65,50 L75,50 L75,75"
              fill="none"
              stroke={color}
              strokeWidth="2"
              style={{ pathLength }}
            />
            {/* False path (down) */}
            <motion.line
              x1="50"
              y1="65"
              x2="50"
              y2="75"
              stroke={color}
              strokeWidth="2"
              style={{ pathLength }}
            />
            {/* End nodes */}
            <motion.rect
              x="40"
              y="75"
              width="20"
              height="10"
              rx="5"
              fill="none"
              stroke={color}
              strokeWidth="2"
              style={{ pathLength }}
            />
            <motion.rect
              x="65"
              y="75"
              width="20"
              height="10"
              rx="5"
              fill="none"
              stroke={color}
              strokeWidth="2"
              style={{ pathLength }}
            />
          </motion.svg>
        );

      case "code": // Code syntax structure
        return (
          <motion.svg
            viewBox="0 0 100 100"
            width={width}
            height={height}
            style={{ scale, opacity }}
          >
            {/* Code lines */}
            <motion.line
              x1="20"
              y1="20"
              x2="80"
              y2="20"
              stroke={color}
              strokeWidth="2"
              style={{
                pathLength,
                y: verticalMove,
              }}
            />
            <motion.line
              x1="20"
              y1="35"
              x2="70"
              y2="35"
              stroke={color}
              strokeWidth="2"
              style={{
                pathLength,
                y: verticalMove70,
              }}
            />
            <motion.line
              x1="30"
              y1="50"
              x2="65"
              y2="50"
              stroke={color}
              strokeWidth="2"
              style={{
                pathLength,
                y: verticalMove50,
              }}
            />
            <motion.line
              x1="30"
              y1="65"
              x2="60"
              y2="65"
              stroke={color}
              strokeWidth="2"
              style={{
                pathLength,
                y: verticalMove30,
              }}
            />
            <motion.line
              x1="20"
              y1="80"
              x2="70"
              y2="80"
              stroke={color}
              strokeWidth="2"
              style={{
                pathLength,
                y: verticalMove10,
              }}
            />

            {/* Indentation markers */}
            <motion.circle
              cx="25"
              cy="35"
              r="1.5"
              fill={color}
              style={{ opacity }}
            />
            <motion.circle
              cx="25"
              cy="50"
              r="1.5"
              fill={color}
              style={{ opacity }}
            />
            <motion.circle
              cx="25"
              cy="65"
              r="1.5"
              fill={color}
              style={{ opacity }}
            />
          </motion.svg>
        );

      default:
        return null;
    }
  };

  return (
    <div ref={ref} className={`absolute pointer-events-none z-0 ${className}`}>
      {renderSVG()}
    </div>
  );
};

export default ScrollSVG;
