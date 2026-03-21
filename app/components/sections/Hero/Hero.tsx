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
className=""
    id="home"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    {/* === Left Content === */}
    <motion.div
      className="flex-1 flex flex-col justify-center items-start"
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
        className="text-white my-8"
        variants={fadeUpVariants}
      >
        Reverence can be tasted. At Biliakyn’s, thoughtfulness is the primary ingredient in everything we create.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, vel modi facilis tempore vitae qui officiis aperiam, similique labore esse ad accusantium sapiente? Vel id quod enim animi, dolore eveniet!
      </motion.p>

      <motion.div variants={fadeUpVariants}>
        <button
          type="button"
          className="bg-golden text-black px-6 py-3 font-semibold cursor-pointer"
          onClick={() => scrollToSection('menu')}
        >
          View Menu
        </button>
      </motion.div>
    </motion.div>

    {/* === Right Image === */}
    <motion.div
      className="flex-1 flex justify-center items-center mt-10 md:mt-0"
      variants={imageRevealVariants}
    >
      <div className="relative w-full h-full min-h-96 flex justify-center items-center">
        <Image
          src={images.welcome}
          alt="header_img"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain w-4/5"
        />
      </div>
    </motion.div>
  </motion.section>
);

export default Hero;