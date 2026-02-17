import type { Variants } from 'framer-motion';

/** Standard page entrance animation */
export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/** Stagger children entrance */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

/** Individual item in a stagger group */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/** Tab content cross-fade */
export const tabContent: Variants = {
  hidden: { opacity: 0, x: 12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    x: -12,
    transition: { duration: 0.15 },
  },
};

/** Modal entrance/exit */
export const modal: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.15 },
  },
};

/** Backdrop fade */
export const backdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/** Card hover (use with whileHover on motion.div) */
export const cardHover = {
  y: -1,
  boxShadow: '0 2px 4px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.15)',
  borderColor: 'rgba(255,255,255,0.15)',
  transition: { duration: 0.15, ease: 'easeOut' },
};

/** Subtle scale on press */
export const tapScale = {
  scale: 0.98,
  transition: { duration: 0.1 },
};
