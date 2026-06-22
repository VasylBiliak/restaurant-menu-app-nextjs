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
  className?: string;
}

const FormField = ({ 
  label, 
  children, 
  variants, 
  className 
}: { 
  label: string; 
  children: React.ReactNode; 
  variants: any; 
  className?: string 
}) => (
  <motion.div 
    variants={variants} 
    className={`relative flex flex-col w-full group gap-1 md:gap-2 lg:gap-4 ${className}`}
  >
    <label className="text-xl uppercase tracking-widest text-white/90">
      {label}
    </label>
    <div className="relative flex items-center border-b border-white/20 pb-1 md:pb-2 transition-all group-hover:border-golden">
      {children}
      <div className="absolute bottom-[-1px] left-0 h-[1px] w-full bg-golden scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
    </div>
  </motion.div>
);

const CustomSelect = ({ 
  label, 
  value, 
  options, 
  isOpen, 
  onToggle, 
  onSelect, 
  variants, 
  className 
}: CustomSelectProps) => {
  return (
    <FormField label={label} variants={variants} className={className}>
      <div className="relative w-full">
        <button
          type="button"
          onClick={onToggle}
          className="font-alt w-full bg-transparent text-golden text-2xl text-left py-1 outline-none flex justify-between items-center cursor-pointer min-[2000px]:text-[2rem]"
        >
          <span className="truncate">{value}</span>
          <svg 
            className={`transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
            width="30" height="30" viewBox="0 0 24 24" fill="none"
          >
            <path 
              d="M7 10l5 5 5-5" 
              stroke="#DAC165" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute left-0 top-full mt-2 z-[100] w-full max-h-[250px] md:max-h-[300px] overflow-y-auto bg-black border border-golden/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] custom-scrollbar">
            {options.map((opt, idx) => {
              const displayValue = typeof opt === 'string' ? opt : opt.label;
              const isSelected = displayValue === value;

              return (
                <div
                  key={idx}
                  onClick={() => onSelect(opt)}
                  className={`px-4 py-3 cursor-pointer text-xl font-alt transition-all border-b border-white/5 last:border-none
                    ${isSelected 
                      ? 'bg-golden text-black font-bold' 
                      : 'text-golden hover:bg-golden/10 hover:pl-6'
                    }`}
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