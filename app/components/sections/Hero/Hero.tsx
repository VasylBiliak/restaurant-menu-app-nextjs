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

const Hero = () => (
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
        Welcome to Biliakyn's!
      </motion.h1>

      <motion.p
        variants={fadeUpVariants}
      >
        Reverence can be tasted. At Biliakyn’s, thoughtfulness is the primary ingredient in everything we create.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      </motion.p>

      <motion.div variants={fadeUpVariants}>
        <button
          type="button"
          className="bg-golden text-black px-6 py-3 font-semibold cursor-pointer font-base"
          onClick={() => scrollToSection('menu')}
        >
          View Menu
        </button>
      </motion.div>
    </motion.div>
  </motion.section>
);

export default Hero;