"use client";

import React, { useState, useContext } from "react";
import MenuContext from "@/app/context/MenuContext";
interface MenuItemProps {
  title: string;
  price: string;
  tags: string;
  selected: boolean;
  images?: string[];
  onSelect: (title: string) => void;
}
import FullScreenGallery from "@/app/components/ui/FullScreenGallery/FullScreenGallery";



const MenuItem = ({ title, price, tags, selected, images = [], onSelect }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useContext(MenuContext);
  return (
    <>
      <div
        onClick={() => onSelect(title)}
        className={`group w-full flex flex-col gap-2 
          rounded-md cursor-pointer transition-all duration-300 px-2 py-2 my-1 border-2 ${selected
            ? "border-golden shadow-[0_0_15px_rgba(220,202,135,0.2)]"
            : "border-transparent hover:border-golden/30"
          }`}
      >
        {/* === GRID FOR SMALL SCREENS === */}
        <div className="grid grid-cols-[5fr_auto] grid-rows-[auto_auto] gap-2 items-start sm:grid-cols-[auto_1fr_auto] sm:grid-rows-1 sm:items-center">

          {/* 1st column: Checkbox + Title */}
          <div className="flex items-center gap-3 row-start-1 row-end-2 sm:row-auto">
            <div
              className={`flex shrink-0 w-6 h-6 border-2 border-golden rounded-sm items-center justify-center transition-all duration-200 ${selected ? "bg-golden" : "bg-transparent"
                }`}
            >
              {selected && (
                <span className="text-black text-sm font-bold leading-none">✔</span>
              )}
            </div>
            <p className=" text-golden text-xl tracking-wider leading-tight">
              {title}
            </p>
          </div>

          {/* 2nd column: Price */}
          <div className="flex justify-end items-start row-start-1 row-end-2 sm:items-center sm:col-start-3">
            <p className="text-lg font-semibold text-golden">{price}</p>
          </div>

          {/* Button occupies second row on mobile, middle column on desktop */}
          {images.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch({
                  type: "OPEN_GALLERY",
                  payload: images,
                });
              }}
              className="text-xl px-1 mx-2 text-white  relative
                   focus:outline-none
                   hover:text-golden
                   after:absolute after:left-0 after:bottom-0
                   after:h-[1px] after:w-full
                   after:bg-golden md:ml-auto lg:ml-auto
                   after:scale-x-0 after:origin-left
                   after:transition-transform
                   hover:after:scale-x-100
                   col-start-1 col-end-3 row-start-2 row-end-3 sm:col-start-2 sm:col-end-3 sm:row-auto"
            >
              View Photos
            </button>
          )}
        </div>



        <p className="w-full min-w-0 text-sm italic wrap-break-word justify-start items-start">
          {tags}
        </p>
      </div>

      <FullScreenGallery
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        images={images}
      />
    </>
  );
};

export default MenuItem;