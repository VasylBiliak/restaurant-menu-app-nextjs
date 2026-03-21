"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from "@/app/components/sectionTitle/SectionTitle";
import { fadeUpVariants, containerVariants } from "@/app/utils/animations";

const BookTable = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const inputBase = `
    w-full bg-transparent border border-golden rounded-[5px] 
    px-4 py-3 text-white font-base text-base outline-none 
    transition-colors focus:border-white 
    min-[2000px]:text-[1.5rem] min-[2000px]:p-[1.5rem]
  `;

  return (
    // === Book Table Section ===
    <section
      id="book"
      ref={ref}
      className="mx-auto w-full"
    >
      <SectionTitle title="Book A Table" isInView={isInView} />

      <motion.form 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col gap-6" 
        onSubmit={(e) => e.preventDefault()}
      >
        <motion.div variants={fadeUpVariants} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <input type="text" placeholder="Full Name" required className={inputBase} />
          <input type="email" placeholder="Email Address" required className={inputBase} />
        </motion.div>

        <motion.div variants={fadeUpVariants} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <input type="tel" placeholder="Phone Number" required className={inputBase} />
          <input type="number" placeholder="Number of Guests" min="1" required className={inputBase} />
        </motion.div>

        <motion.div variants={fadeUpVariants} className="grid grid-cols-1 gap-6 md:grid-cols-2">        
          <input 
            type="date" 
            required 
            suppressHydrationWarning
            className={`${inputBase} appearance-none [color-scheme:dark]`} 
          />
          <input 
            type="time" 
            required 
            suppressHydrationWarning
            className={`${inputBase} appearance-none [color-scheme:dark]`} 
          />
        </motion.div>

        <motion.div variants={fadeUpVariants}>
          <textarea
            placeholder="Special requests"
            rows={4}
            className={`${inputBase} resize-none`}
          />
        </motion.div>

        <motion.div variants={fadeUpVariants} className="mt-4 flex justify-center">
          <button
            type="submit"
            className="cursor-pointer border-2 border-golden bg-transparent px-10 py-3 font-base text-base font-bold tracking-widest text-white transition-all hover:bg-golden hover:text-black active:scale-95 min-[2000px]:text-[1.8rem] min-[2000px]:px-14 min-[2000px]:py-6"
          >
            Reserve Table
          </button>
        </motion.div>
      </motion.form>

      <style jsx global>{`
        input:-webkit-autofill,
        textarea:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px black inset !important;
          -webkit-text-fill-color: white !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </section>
  );
};

export default BookTable;