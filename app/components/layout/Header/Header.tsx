"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GiKnifeFork, GiForkKnifeSpoon } from "react-icons/gi";
import images from '@/app/data/images';
import { scrollToSection } from '@/app/utils/scrollToSection';
import { fadeDownVariants, fadeInVariants } from '@/app/utils/animations';
import LanguageSwitcher from '@/app/components/ui/LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from '@/app/hooks/useTranslation';

const navLinks = [
  { id: 'about', key: 'nav_about' },
  { id: 'gallery', key: 'nav_gallery' },
  { id: 'menu', key: 'nav_menu' },
  { id: 'chef', key: 'nav_chef' },
  { id: 'book', key: 'nav_book_table' },
  { id: 'contact', key: 'nav_contact' },
];

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { t } = useTranslation();

  const handleNavClick = (section: string) => {
    scrollToSection(section);
    setToggleMenu(false);
  };

  return (
    <motion.header
      className="text-white bg-black w-full flex justify-between items-center py-2 px-2 fixed top-0 left-0 z-100 sm:px-4"
      initial="hidden"
      animate="visible"
      variants={fadeDownVariants}
    >
      {/* === Logo === */}
      <div className="flex justify-start items-center cursor-pointer">
        <Image
          src={images.logo}
          alt={t('header_logo_alt')}
          className="w-40 h-15"
          onClick={() => handleNavClick('home')}
        />
      </div>

      <LanguageSwitcher />
      {/* === Desktop Menu === */}
      <nav className="flex-1 hidden md:flex justify-center items-center">
        <ul className="flex list-none">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className="mx-4 cursor-pointer font-semibold text-white hover:text-golden font-base transition-colors"
            >
              <a
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
              >
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {/* === Mobile Menu Button === */}
      <div className="md:hidden flex cursor-pointer">
        <button
          aria-label={t('header_open_menu')}
          onClick={() => setToggleMenu(true)}
        >
          <GiForkKnifeSpoon
            className="text-white hover:text-golden transition-colors rotate-270"
            fontSize={35}
          />
        </button>

        <AnimatePresence>
          {toggleMenu && (
            <motion.div
              className="fixed top-0 left-0 w-screen h-screen bg-black flex flex-col justify-center items-center z-200"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeInVariants}
            >
              <button
                className="absolute top-8 right-8"
                aria-label={t('header_close_menu')}
                onClick={() => setToggleMenu(false)}
              >
                <GiKnifeFork className="text-3xl text-white hover:text-golden transition-colors" />
              </button>

              <nav>
                <ul className="list-none">
                  {navLinks.map((link) => (
                    <li
                      key={link.id}
                      className="m-8 text-3xl text-center font-base text-white hover:text-golden cursor-pointer"
                    >
                      <a
                        href={`#${link.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.id);
                        }}
                      >
                        {t(link.key)}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;