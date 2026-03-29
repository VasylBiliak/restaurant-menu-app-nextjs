"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { fadeDownVariants } from '@/app/utils/animations';

type SectionTitleProps = {
  title: string;
  isInView: true | boolean;
};

const SectionTitle = ({ title, isInView }: SectionTitleProps) => (
  // === Section Title ===
  <motion.div
    className="text-center font-bold capitalize flex w-full justify-center"
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    variants={fadeDownVariants}
  >
    <h1 className="text-4xl text-golden font-base">
      {title}
    </h1>
  </motion.div>
);

export default SectionTitle;