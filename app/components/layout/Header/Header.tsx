"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GiKnifeFork, GiForkKnifeSpoon } from "react-icons/gi";
import images from '@/app/data/images';
import { scrollToSection } from '@/app/utils/scrollToSection';
import { fadeDownVariants, fadeInVariants } from '@/app/utils/animations';

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'menu', label: 'Menu' },
  { id: 'book', label: 'Book Table' },
  { id: 'contact', label: 'Contact' },
];

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleNavClick = (section: string) => {
    scrollToSection(section);
    setToggleMenu(false);
  };

  return (
    <motion.header
      className="text-white bg-black w-full flex justify-between items-center py-2 px-4 fixed top-0 left-0 z-100 sm:px-4"
      initial="hidden"
      animate="visible"
      variants={fadeDownVariants}
    >
      {/* === Logo === */}
      <div className="flex justify-start items-center cursor-pointer">
        <Image 
          src={images.logo} 
          alt="Restaurant Logo"
          className="w-30 h-10"
          onClick={() => handleNavClick('home')}
        />
      </div>
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
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {/* === Mobile Menu Button === */}
      <div className="md:hidden flex cursor-pointer">
        <button 
          aria-label="Open Menu"
          onClick={() => setToggleMenu(true)}
        >
          <GiForkKnifeSpoon
            className="text-white hover:text-golden transition-colors rotate-270"
            fontSize={30}
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
                aria-label="Close Menu"
                onClick={() => setToggleMenu(false)}
              >
                <GiKnifeFork className="text-2xl text-white hover:text-golden transition-colors" />
              </button>

              <nav>
                <ul className="list-none">
                  {navLinks.map((link) => (
                    <li
                      key={link.id}
                      className="m-8 text-2xl text-center font-base text-white hover:text-yellow-300 cursor-pointer"
                    >
                      <a 
                        href={`#${link.id}`} 
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.id);
                        }}
                      >
                        {link.label}
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