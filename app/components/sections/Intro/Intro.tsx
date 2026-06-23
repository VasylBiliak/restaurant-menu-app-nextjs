"use client";

import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { easeSmooth, fadeUpVariants } from '@/app/utils/animations';
import { useTranslation } from '@/app/hooks/useTranslation';

const Intro = memo(() => {
  const [playVideo, setPlayVideo] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const { t } = useTranslation();

  useEffect(() => {
    const video = vidRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(() => {
        // Silently fail - video might not be ready
      });
    } else {
      video.pause();
    }
  }, [isInView]);

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

  const handleToggleVideo = useCallback(() => {
    const video = vidRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden p-0! mw-1400px mx-auto!"      
    >
      <video
        ref={vidRef}
        src="/video/introVid.mp4"
        loop
        playsInline
        muted
        preload="metadata"
        className="h-full w-full object-cover opacity-60 will-change-transform"
        style={{ willChange: 'transform' }}
      />

      <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
        <div className="flex max-w-720px flex-col items-center justify-center gap-6 p-6 text-center">

          <motion.h2
            className="font-base text-golden text-[clamp(2.5rem,5vw,4rem)] leading-[1.2] tracking-[0.04em] capitalize m-0"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            {t('intro_title')}
          </motion.h2>

          <motion.p
            className="bg-transparent!"
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
          >
            {t('intro_description')}
          </motion.p>

          <motion.div
            className="
    flex items-center justify-center cursor-pointer
    rounded-full border border-golden
    w-16 h-16
    sm:w-20 sm:h-20
    md:w-24 md:h-24
    lg:w-28 lg:h-28
    transition-all duration-300
    hover:scale-110 hover:border-white
    active:scale-95
  "
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.6 }}
            onClick={handleToggleVideo}
            onKeyDown={(e) => e.key === 'Enter' && handleToggleVideo()}
            role="button"
            tabIndex={0}
            aria-label={playVideo ? t('intro_pause_video') : t('intro_play_video')}
          >
            {playVideo ? (
              <BsPauseFill className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl" />
            ) : (
              <BsFillPlayFill className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl" />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Intro.displayName = 'Intro';

export default Intro;
