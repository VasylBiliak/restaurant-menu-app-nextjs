"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CustomSelectProps {
  label: string;
  value: string;
  options: any[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (option: any) => void;
  variants: any;
}

const FormField = ({ label, children, variants }: { label: string; children: React.ReactNode; variants: any }) => (
  <motion.div variants={variants} className="relative flex flex-col w-full group gap-2">
    <label className="text-xl uppercase tracking-widest">
      {label}
    </label>
    <div className="relative flex items-center border-b border-white/20 pb-2 transition-all group-hover:border-golden">
      {children}
      <div className="absolute bottom-[-1px] left-0 h-[1px] w-full bg-golden scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
    </div>
  </motion.div>
);

const CustomSelect = ({ label, value, options, isOpen, onToggle, onSelect, variants }: CustomSelectProps) => {
  return (
    <FormField label={label} variants={variants}>
      <div className="relative w-full ">
        <button
          type="button"
          onClick={onToggle}
          className="font-alt w-full bg-transparent text-golden text-2xl text-left py-1 outline-none flex justify-between items-center cursor-pointer min-[2000px]:text-[2rem]"
        >
          {value}
          <svg 
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
            width="30" height="30" viewBox="0 0 24 24" fill="none"
          >
            <path d="M7 10l5 5 5-5" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {isOpen && (
          <div className="absolute left-0 top-full mt-2 z-[100] w-full max-h-[300px] overflow-y-auto bg-black border border-golden shadow-2xl custom-scrollbar">
            {options.map((opt, idx) => {
              const displayValue = typeof opt === 'string' ? opt : opt.label;
              const isSelected = displayValue === value;

              return (
                <div
                  key={idx}
                  onClick={() => onSelect(opt)}
                  className={`px-4 py-3 cursor-pointer text-xl transition-colors border-b border-white/5 last:border-none
                    ${isSelected ? 'bg-golden text-black' : 'text-golden hover:bg-golden hover:text-black'}`}
                >
                  {displayValue}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </FormField>
  );
};

export default CustomSelect;