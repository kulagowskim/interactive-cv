"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import Image from "next/image";
import ScrollSVG from "./ui/ScrollSVG";

const projects = [
  {
    id: 1,
    title: "Projekt 1: Interaktywne CV",
    imageUrl: "/images/project1-placeholder.png",
    description:
      "Nowoczesna strona CV zbudowana z Next.js, Tailwind CSS i Framer Motion.",
    details:
      "Szczegółowy opis projektu 1. Można tu zawrzeć informacje o użytych technologiach, wyzwaniach, rozwiązaniach i link do repozytorium lub wersji live.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
  },
  {
    id: 2,
    title: "Projekt 2: Aplikacja E-commerce",
    imageUrl: "/images/project2-placeholder.png",
    description:
      "Platforma e-commerce z koszykiem, płatnościami i panelem administracyjnym.",
    details:
      "Szczegółowy opis projektu 2. Można tu zawrzeć informacje o backendzie (np. Node.js, Express), bazie danych (np. MongoDB, PostgreSQL) i innych technologiach.",
    tags: ["React", "Node.js", "MongoDB", "Stripe API"],
  },
];

const Projects = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const handleCardClick = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <motion.section
        ref={ref}
        id="projects"
        className="w-full max-w-6xl py-20 md:py-32 px-4 relative"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <ScrollSVG
          type="code"
          color="#2dd4bf"
          className="top-10 right-10 opacity-30 rotate-45"
          width={150}
          height={150}
        />

        <ScrollSVG
          type="brackets"
          color="#f97316"
          className="bottom-10 left-10 opacity-30"
          width={120}
          height={120}
        />

        <div className="mb-2 text-sm text-blue-400 font-mono text-center">
          {"import { Projects } from './portfolio';"}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-blue-400 section-heading">
          Projekty
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="cursor-pointer"
              onClick={() => handleCardClick(project)}
            >
              <Card
                className="h-full flex flex-col border border-blue-500/20 font-mono"
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0px 0px 15px rgba(59,130,246,0.3)",
                }}
              >
                <div className="text-xs text-blue-400 mb-2">{`function Project${project.id}() {`}</div>
                <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
                  <Image
                    src={project.imageUrl}
                    alt={`Podgląd projektu ${project.title}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-purple-400 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm mb-3 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-700 text-xs text-blue-300 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-blue-400 mt-3">{`}`}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={handleCloseModal}
          title={selectedProject.title}
        >
          <div className="relative w-full h-64 mb-4 overflow-hidden rounded-md">
            <Image
              src={selectedProject.imageUrl}
              alt={`Szczegóły projektu ${selectedProject.title}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="mb-4 leading-relaxed">{selectedProject.details}</p>
          <div className="flex flex-wrap gap-2">
            {selectedProject.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-700 text-xs text-blue-300 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Projects;
