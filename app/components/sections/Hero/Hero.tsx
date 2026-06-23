"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { scrollToSection } from '@/app/utils/scrollToSection';
import images from '@/app/data/images';
import {
  containerVariants,
  columnVariants,
  fadeUpVariants,
  imageRevealVariants,
} from '@/app/utils/animations';
import { useTranslation } from '@/app/hooks/useTranslation';

const Hero = () => {
  const { t } = useTranslation();

  return (
    // === Hero Section ===
    <motion.section
      className="relative flex justify-center items-center
bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/images/welcome.jpg')]
bg-cover bg-center
  pr-0! pl-0!"
      id="home"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* === Left Content === */}
      <motion.div
        className="text-center flex flex-col justify-center items-center m-4 gap-16"
        variants={columnVariants}
      >
        <motion.h1
          className="font-bold text-5xl leading-tight text-golden capitalize tracking-wide
        sm:text-6xl
        md:text-8xl
        2xl:text-9xl"
          variants={fadeUpVariants}
        >
          {t('hero_welcome')}
        </motion.h1>

        <motion.p
          variants={fadeUpVariants}
        >
          {t('hero_description')}
        </motion.p>

        <motion.div variants={fadeUpVariants}>
          <button
            type="button"
              className="group relative text-2xl cursor-pointer overflow-hidden border-2 border-golden px-12 py-4   tracking-[0.2em] text-white transition-all hover:bg-golden hover:text-black active:scale-95 min-[2000px]:text-[1.8rem] mt-4"
            onClick={() => scrollToSection('menu')}
          >
            {t('hero_view_menu')}
          </button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;