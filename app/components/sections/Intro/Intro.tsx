"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { easeSmooth, fadeUpVariants } from '@/app/utils/animations';

const Intro = () => {
  const [playVideo, setPlayVideo] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });

  // Автоматичне керування відео при скролі
  useEffect(() => {
    const video = vidRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(() => {
        // Деякі браузери блокують автоплей без взаємодії
        console.log("Autoplay prevented");
      });
    } else {
      video.pause();
    }
  }, [isInView]);

  // Синхронізація іконки зі станом відео
  useEffect(() => {
    const video = vidRef.current;
    if (!video) return;

    const onPlay = () => setPlayVideo(true);
    const onPause = () => setPlayVideo(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  const handleToggleVideo = () => {
    const video = vidRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden p-0! mw-1400px mx-auto!"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.2, ease: easeSmooth }}
    >
      <video
        ref={vidRef}
        src="/video/introVid.mp4" //@/public/
        loop
        playsInline
        muted
        className="h-full w-full object-cover opacity-60"
      />

      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        <div className="flex max-w-720px flex-col items-center justify-center gap-6 p-8 text-center">
          
          <motion.h2
            className="font-base text-golden text-[clamp(2.5rem,5vw,4rem)] leading-[1.2] tracking-[0.04em] capitalize m-0"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            Thoughtfulness in every detail.
          </motion.h2>

          <motion.p
            className="font-alt text-white text-[clamp(1rem,2vw,1.25rem)] leading-[1.6] tracking-[0.04em] m-0"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
          >
            Once a hidden club, now <h2 className="uppercase tracking-[0.2em] text-golden">Toronto’s</h2> premier destination for those who seek the extraordinary. A journey of the senses awaits.
          </motion.p>

          <motion.div
            className="mt-2 flex h-100px w-100px cursor-pointer items-center justify-center rounded-full border border-golden transition-all duration-300 hover:scale-110 hover:border-white active:scale-95"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.6 }}
            onClick={handleToggleVideo}
            onKeyDown={(e) => e.key === 'Enter' && handleToggleVideo()}
            role="button"
            tabIndex={0}
            aria-label={playVideo ? 'Pause video' : 'Play video'}
          >
          {playVideo ? (
            <BsPauseFill className="text-white text-2xl md:text-4xl lg:text-5xl transition-all" />
          ) : (
            <BsFillPlayFill className="text-white text-2xl md:text-4xl lg:text-5xl transition-all" />
          )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Intro;