"use client";

import {
  motion,
  TargetAndTransition,
  VariantLabels,
  Variants,
  Transition,
} from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  whileHover?: TargetAndTransition;
  variants?: Variants;
  initial?: VariantLabels | TargetAndTransition;
  animate?: VariantLabels | TargetAndTransition;
  transition?: Transition;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  whileHover = { scale: 1.03, boxShadow: "0px 0px 15px rgba(59,130,246,0.3)" },
  variants,
  initial,
  animate,
  transition,
}) => {
  return (
    <motion.div
      className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden p-6 border-l-2 border-blue-500 ${className}`}
      whileHover={whileHover}
      variants={variants}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default Card;
