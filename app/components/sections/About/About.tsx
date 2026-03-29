"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionTitle from "@/app/components/sectionTitle/SectionTitle";
import { fadeUpVariants } from "@/app/utils/animations";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    // === About Section ===
    <section
      ref={ref}
      id="about"
className="relative flex justify-center items-center gap-10 
  bg-[url('/images/bg/bg_wood.jpg')] bg-center bg-cover bg-repeat bg-fixed
  "
    >
      {/* === Content === */}
      <div className="relative z-10 flex flex-col justify-end items-start gap-10 md:gap-16 lg:flex-row lg:gap-20 w-full ">
        
        {/* --- p1 --- */}
        <motion.div
          className="flex-1 flex flex-col justify-center items-start text-left gap-2"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
        >
          <SectionTitle title="About Us" isInView={isInView} />
          <p className="max-w-450px md:max-w-550px lg:max-w-700px md:text-lg 2xl:text-xl">
            Reverence can be tasted.
            Biliakyn’s kitchen is lucid, elemental, and soulful. Our mission is to create experiences that engage every sense — dishes that restore the spirit, challenge the palate, and enrich the connection between the land and the plate.
          </p>
        </motion.div>

        {/* --- p2 --- */}
        <motion.div
          className="flex-1 flex flex-col justify-start items-start lg:items-end text-left lg:text-right gap-2"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
        >
          <SectionTitle title="We are!" isInView={isInView} />
          <p className="max-w-450px md:max-w-550px lg:max-w-700px md:text-lg 2xl:text-xl">
            Elemental means force and stands for the living formative forces of the North. These forces are not visible, but their biologic 'footprints' are. At Biliakyn’s, we observe and understand the invisible connections between the formative forces of nature and the physical matter of the ingredients we serve. Here, <span >Toronto’s</span> premier dining meets the raw soul of the wilderness.
          </p>
        </motion.div>



      </div>
    </section>
  );
};

export default About;