"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import images from '@/app/data/images';
import SectionTitle from "@/app/components/sectionTitle/SectionTitle";
import { fadeUpVariants, easeSmooth } from "@/app/utils/animations";

const GALLERY_IMAGES = [images.gallery1, images.gallery2, images.gallery3, images.gallery4, images.gallery5];
const AUTO_PLAY_INTERVAL_MS = 5000;

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [isPaused, setIsPaused] = useState(false);
  const [[currentIndex, direction], setPage] = useState([0, 0]);
  const [showFullGallery, setShowFullGallery] = useState(false);

  const n = GALLERY_IMAGES.length;

  const paginate = useCallback((newDirection: number) => {
    setPage((prev) => {
      // Логіка кроку: 1 для мобільних (одне фото), 2 для десктопа (два фото)
      // Але для простоти пагінації залишаємо крок 1, щоб користувач міг гортати кожне фото
      let nextIdx = prev[0] + newDirection;
      if (nextIdx >= n) nextIdx = 0;
      if (nextIdx < 0) nextIdx = n - 1;
      return [nextIdx, newDirection];
    });
  }, [n]);

  useEffect(() => {
    if (showFullGallery) return;
    const id = setInterval(() => {
      if (!isPaused) paginate(1);
    }, AUTO_PLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPaused, paginate, showFullGallery]);

  const toggleGallery = () => setShowFullGallery(!showFullGallery);

  return (
    <section
      ref={ref}
      id="gallery"
      className="flex justify-center items-center 
      bg-[url('/images/bg/bg_wood.jpg')] bg-center bg-cover bg-repeat bg-fixed
      "
    >
      <div className="flex flex-col gap-8 w-full">
        {/* SECTION HEADER */}
        <motion.div
          className="flex flex-col items-center text-center gap-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
        >
          <SectionTitle title="Gallery" isInView={isInView} />
          <p className="">
            Explore our restaurant's atmosphere and delicious dishes through our curated gallery.
          </p>
          <button
            type="button"
            className="text-white max-w-5xl border-b border-golden pb-1 hover:text-golden transition-colors "
            onClick={toggleGallery}
          >
            {showFullGallery ? 'View Less' : 'View More'}
          </button>
        </motion.div>

        <div className="w-full relative min-h-96">
          {!showFullGallery ? (
            <motion.div
              className="relative w-full overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentIndex}
                  className="flex gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[currentIndex, (currentIndex + 1) % n].map((idx, arrayIndex) => (
                    <div
                      key={`${idx}-${arrayIndex}`}
                      className={`relative flex-1 h-80 md:h-96 overflow-hidden rounded-sm group ${arrayIndex === 1 ? 'hidden md:block' : 'block'
                        }`}
                      style={{ minHeight: '400px' }}
                    >
                      <Image
                        src={GALLERY_IMAGES[idx]}
                        alt="gallery"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority={isInView}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={85}
                      />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* NAVIGATION ARROWS */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
                <BsArrowLeftShort
                  className="text-white text-5xl cursor-pointer pointer-events-auto rounded-2xl h-80 "
                  onClick={() => paginate(-1)}
                />
                <BsArrowRightShort
                  className="text-white text-5xl cursor-pointer pointer-events-auto  rounded-2xl h-80 "
                  onClick={() => paginate(1)}
                />
              </div>
            </motion.div>
          ) : (
            /* GRID MODE */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {GALLERY_IMAGES.map((image, index) => (
                <div
                  key={index}
                  className="relative h-64 overflow-hidden rounded-sm group"
                >
                  <Image
                    src={image}
                    alt="grid item"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;