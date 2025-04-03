"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Card from "@/components/ui/Card";
import ScrollSVG from "./ui/ScrollSVG";

const experiences = [
  {
    id: 1,
    company: "Nazwa Firmy 1",
    position: "Stanowisko 1",
    period: "2022 - Obecnie",
    description:
      "Krótki opis obowiązków i osiągnięć w tej firmie. Używaj konkretnych przykładów i liczb, jeśli to możliwe.",
  },
  {
    id: 2,
    company: "Nazwa Firmy 2",
    position: "Stanowisko 2",
    period: "2020 - 2022",
    description:
      "Krótki opis obowiązków i osiągnięć. Skup się na tym, co najważniejsze i najbardziej imponujące.",
  },
];

const Experience = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      id="experience"
      className="w-full max-w-5xl py-20 md:py-32 px-4 relative"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <ScrollSVG
        type="algorithm"
        color="#8b5cf6"
        className="top-10 left-10 opacity-30"
        width={150}
        height={150}
      />

      <ScrollSVG
        type="code"
        color="#ec4899"
        className="bottom-10 right-10 opacity-30"
        width={100}
        height={100}
      />

      <div className="mb-2 text-sm text-blue-400 font-mono text-center">
        {"/* Experience components */"}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-blue-400 section-heading">
        Doświadczenie
      </h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
      >
        {experiences.map((exp) => (
          <Card
            key={exp.id}
            variants={cardVariants}
            className="border border-blue-500/20 font-mono"
          >
            <div className="text-xs text-blue-400 mb-2">{`// ${exp.period}`}</div>
            <h3 className="text-xl font-semibold text-purple-400 mb-1">
              {exp.company}
            </h3>
            <p className="text-md font-medium text-gray-400 mb-2">
              {exp.position}
            </p>
            <p className="text-gray-300 leading-relaxed">{exp.description}</p>
          </Card>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Experience;
