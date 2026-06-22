// === Global easing ===
export const easeSmooth = [0.65, 0, 0.35, 1] as const;
export const easeNav = [0.25, 0.46, 0.45, 0.94] as const;


// === Container (stagger children) ===
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};


// === Column (nested stagger) ===
export const columnVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};


// === Fade Up (default item) ===
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: easeSmooth,
    },
  },
};


// === Fade Down (navbar, headers) ===
export const fadeDownVariants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: easeNav,
    },
  },
};


// === Fade In (no movement) ===
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: easeSmooth,
    },
  },
};


// === Image Reveal (right side hero etc.) ===
export const imageRevealVariants = {
  hidden: { opacity: 0, x: 48, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1.35,
      ease: easeSmooth,
      delay: 0.45,
    },
  },
};


// === Scale In (cards, buttons) ===
export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeSmooth,
    },
  },
};