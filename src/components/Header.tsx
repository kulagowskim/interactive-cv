"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  usePathname as useNextPathname,
  useRouter as useNextRouter,
} from "next/navigation";

const Header = () => {
  const t = useTranslations("Header");
  const router = useNextRouter();
  const pathname = useNextPathname();
  const locale = useLocale();

  const changeLocale = (newLocale: string) => {
    const newPathname = pathname.startsWith(`/${locale}`)
      ? `/${newLocale}${pathname.substring(locale.length + 1)}`
      : `/${newLocale}${pathname}`;

    router.replace(newPathname);
  };

  return (
    <motion.header
      className="w-full py-16 md:py-24 flex flex-col items-center text-center relative"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={() => changeLocale("pl")}
          className={`px-3 py-1 rounded-md text-sm transition-colors ${
            locale === "pl"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          disabled={locale === "pl"}
        >
          PL
        </button>
        <button
          onClick={() => changeLocale("en")}
          className={`px-3 py-1 rounded-md text-sm transition-colors ${
            locale === "en"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          disabled={locale === "en"}
        >
          EN
        </button>
      </div>

      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        Mateusz Kulągowski
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl lg:text-2xl text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      >
        {t("jobTitle")}
      </motion.p>
    </motion.header>
  );
};

export default Header;
