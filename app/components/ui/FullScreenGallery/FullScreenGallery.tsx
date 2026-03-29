"use client";

import { useEffect } from "react";
import Image from "next/image";
import defImg from "@/public/images/meel/400х400.png";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  images?: string[];
}

export default function FullScreenGallery({
  isOpen,
  onClose,
  images = [],
}: Props) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed justify-items-center items-center inset-0  z-400 bg-red/50 backdrop-blur-sm ">

      {/* 🔥 КНОПКА ЗАВЖДИ ПОВЕРХ */}
      
      <button
        onClick={onClose}
        className=" fixed  right-10 top-5 z-500
                   text-white text-3xl font-bold
                   bg-black/50 backdrop-blur-md
                   px-5 py-2 rounded-lg
                   hover:bg-white hover:text-black
                   transition"
      >
        ✕
      </button>

      {/* Gallery */}
      <div className="w-full h-full overflow-auto px-4 pt-30 pb-10">
<div className={`
  grid gap-4
  ${images.length === 1 ? "grid-cols-1 place-items-center" : ""}
  ${images.length === 2 ? "grid-cols-1 md:grid-cols-2 place-items-center" : ""}
  ${images.length >= 3 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : ""}
`}>
          
          {images.length > 0 ? (
            images.map((img, index) => (
              <div key={index} className="w-full">
                <Image
                  src={img}
                  alt={`photo-${index}`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            ))
          ) : (
            <Image
              src={defImg}
              alt="default"
              width={400}
              height={400}
              className="w-full object-contain"
            />
          )}

        </div>
      </div>
    </div>
  );
}