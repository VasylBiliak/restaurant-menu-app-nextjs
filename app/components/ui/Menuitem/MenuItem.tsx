"use client";

import React from "react";

interface MenuItemProps {
  title: string;
  price: string;
  tags: string;
  selected: boolean;
  onSelect: (title: string) => void;
}

const MenuItem = ({ title, price, tags, selected, onSelect }: MenuItemProps) => {
return (
  <>
    {/* === MAIN ITEM CONTAINER === */}
    <div
      onClick={() => onSelect(title)}
      className={`group w-full flex flex-col rounded-md cursor-pointer transition-all duration-300 px-2 py-2 my-1 border-2 ${
        selected 
        ? "border-golden shadow-[0_0_15px_rgba(220,202,135,0.2)]" 
        : "border-transparent hover:border-golden/30"
      }`}
    >
      {/* === UPPER SECTION: Checkbox, Name, and Price === */}
      <div className="flex justify-between items-center gap-2">
        
        {/* === TITLE AND CHECKBOX GROUP === */}
        <div className="flex-1 flex items-center gap-3">
          
          {/* Custom Checkbox Component */}
          <div 
            className={`flex shrink-0 w-6 h-6 border-2 border-golden rounded-sm items-center justify-center transition-all duration-200 ${
              selected ? "bg-golden" : "bg-transparent"
            }`}
          >
            {selected && (
              <span className="text-black text-sm font-bold leading-none">
                ✔
              </span>
            )}
          </div>

          {/* Dish Title */}
          <p className="font-base text-golden text-xl tracking-wider leading-tight">
            {title}
          </p>
        </div>

        {/* === PRICE DISPLAY === */}
        <div className="flex justify-end items-end text-white">
          <p className="font-base text-lg font-semibold">
            {price}
          </p>
        </div>
      </div>

      {/* === LOWER SECTION: Description / Tags === */}
    <p className=" w-full min-w-0 font-alt text-sm italic text-white/70 wrap-break-word justify-start items-start">
      {tags}
    </p>
    </div>
    </>
  );
};

export default MenuItem;