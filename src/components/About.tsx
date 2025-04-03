"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ScrollSVG from "./ui/ScrollSVG";

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.1, 
  });

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      ref={ref}
      id="about"
      className="w-full max-w-4xl py-20 md:py-32 px-4 text-center relative"
      variants={fadeInVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <ScrollSVG
        type="brackets"
        color="#4f46e5"
        className="top-5 right-5 opacity-30"
        width={120}
        height={120}
      />

      <ScrollSVG
        type="terminal"
        color="#3b82f6"
        className="bottom-0 left-0 opacity-30"
        width={100}
        height={100}
      />

      <div className="mb-2 text-sm text-blue-400 font-mono">
        {"// About section"}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-400 section-heading">
        O mnie
      </h2>
      <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-mono">
        [Tutaj wstaw opis swoich umiejętności, doświadczenia i pasji. Opowiedz o
        sobie w angażujący sposób. Wspomnij o kluczowych technologiach, w
        których się specjalizujesz oraz o tym, co Cię motywuje w pracy jako
        developer.]
        <span className="cursor-blink"></span>
      </p>
    </motion.section>
  );
};

export default About;
