"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import images from "@/app/data/images";
import {
  containerVariants,
  columnVariants,
  fadeUpVariants,
} from "@/app/utils/animations";
import SectionTitle from "../../sectionTitle/SectionTitle";

const Chef = () => {
  const [isChef, setIsChef] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.015 });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChef((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
<motion.section
  id="chef"
  initial="hidden"
  animate="visible"
  ref={ref}
  variants={containerVariants}
  className="
    flex justify-center items-center
    bg-[linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/images/welcome.jpg')]
    bg-cover bg-center bg-fixed
    w-full
  "
>
  <div className="flex flex-col gap-4 md:gap-8 max-w-[1200px] w-full">
    
    {/* === Text === */}
    <motion.div className="flex flex-col text-center md:text-left gap-6 md:gap-8" variants={columnVariants}>
      <SectionTitle title="Chef" isInView={isInView} />
      <motion.h2 className="text-3xl md:text-5xl font-bold" variants={fadeUpVariants}>
        Crafted with passion
      </motion.h2>
      <motion.p className="leading-relaxed" variants={fadeUpVariants}>
        Every dish tells a story. Built on passion, precision, and respect
        for ingredients, each creation is designed to deliver more than
        taste — an experience that lingers and connects.
      </motion.p>
    </motion.div>

    {/* === Image & signature === */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-20 items-start">
      
      {/* === Image with fade animation === */}
      <div className="w-full flex justify-center">
        <div className="relative w-[300px] sm:w-[400px] h-[450px] sm:h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={isChef ? "chef" : "sous"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={isChef ? images.chef : images.chefYang}
                alt="chef"
                fill
                className="object-cover rounded-lg"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* === Text & signature === */}
      <motion.div className="flex flex-col items-center sm:items-start gap-4 md:gap-8" variants={fadeUpVariants}>
        <SectionTitle title={isChef ? "Chef Biliak" : "Sous-chef"} isInView={isInView} />
        <p className="text-center sm:text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In vel deserunt, sequi ullam iste similique
        </p>

        <div className="relative w-[200px] sm:w-[300px] h-[100px] sm:h-[150px]">
          <Image
            src={images.signature}
            alt="signature"
            fill
            className="object-contain opacity-80"
          />
        </div>
      </motion.div>

    </div>
  </div>
</motion.section>
  );
};

export default Chef;