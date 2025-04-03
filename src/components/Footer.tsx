"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react"; // Ikony społecznosciowe
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/kulagowskim",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/mateusz-kulagowski/",
    },
    {
      name: "Email",
      icon: Mail,
      url: "matkulagowski@gmail.com",
    },
  ];

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <footer className="w-full py-8 mt-16 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 sm:mb-0">
          {t("copyright", { year: currentYear })}
        </p>
        <div className="flex space-x-6">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={`Odwiedź mój profil ${link.name}`}
              whileHover="hover"
            >
              <motion.span variants={iconVariants}>
                <link.icon size={24} />
              </motion.span>
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
