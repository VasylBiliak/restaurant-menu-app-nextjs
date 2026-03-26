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
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChef((prev) => !prev);
    }, 5000);

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
      flex items-center justify-center       bg-[url('/images/welcome.jpg')] bg-center bg-cover bg-fixed 
      "
    >      
      {/* Content */}
      <div className="flex flex-col
       gap-4 md:gap-8
      ">

        {/* === Text === */}
        <motion.div
          className="text-center md:text-left"
          variants={columnVariants}
        >
            <SectionTitle title="Chef" isInView={isInView} />

          <motion.h2
            className="text-white text-3xl md:text-5xl font-bold mb-6"
            variants={fadeUpVariants}
          >
            Crafted with passion
          </motion.h2>

          <motion.p
            className=" leading-relaxed mb-6"
            variants={fadeUpVariants}
          >
            Every dish tells a story. Built on passion, precision, and respect
            for ingredients, each creation is designed to deliver more than
            taste — an experience that lingers and connects.
          </motion.p>
        </motion.div>
        {/* === Image & signature === */}
        <div className="flex md:items-start flex-col sm:flex-row items-center gap-10 md:gap-20 w-full">

          {/* === Image with fade animation === */}
          <div className="flex justify-center items-center">
            <div className="relative w-[300px] h-[370px] sm:w-[400px] sm:h-[500px]  rounded-2xl">
overflow-hidden
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
                    src={isChef ? images.chef : images.sousChef}
                    alt="chef"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
          <motion.div
            className="flex flex-col items-start  gap-3"
            variants={fadeUpVariants}
          >
            
             <SectionTitle title={isChef ? "Chef Biliak" : "Sous-chef"} isInView={isInView} />              
            <p className="text-white font-semibold text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In vel deserunt, sequi ullam iste similique
            </p>

            <div className="relative w-[150px] h-[70px] md:w-[300px] h-[150px]">
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