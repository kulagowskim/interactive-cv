"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Section = "about" | "experience" | "projects" | "contact";

const NavigationIndicator = () => {
  const [activeSection, setActiveSection] = useState<Section>("about");
  const t = useTranslations("Navigation");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 300;

      sections.forEach((section) => {
        const htmlSection = section as HTMLElement;
        const sectionTop = htmlSection.offsetTop;
        const sectionHeight = htmlSection.offsetHeight;
        const sectionId = htmlSection.getAttribute("id") as Section;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: Section) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {(["about", "experience", "projects", "contact"] as const).map(
        (section) => (
          <div key={section} className="relative group">
            <button
              onClick={() => scrollToSection(section)}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeSection === section
                  ? "bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.7)]"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
              aria-label={t(section)}
            />
            <div className="absolute right-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 px-2 py-1 rounded text-xs pointer-events-none">
              {t(section)}
            </div>
          </div>
        )
      )}
    </motion.div>
  );
};

export default NavigationIndicator;
