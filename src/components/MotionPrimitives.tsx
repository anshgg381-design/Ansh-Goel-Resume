import { motion } from 'motion/react';
import type { ReactNode } from 'react';

export const EDITORIAL_EASE = [0.22, 1, 0.36, 1] as const;

interface EditorialRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * Subtle editorial fade + settle reveal for page blocks and below-the-fold sections.
 */
export function EditorialReveal({
  children,
  className,
  delay = 0,
  y = 10,
}: EditorialRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.42, delay, ease: EDITORIAL_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface EditorialStaggerItemProps {
  children: ReactNode;
  index: number;
  className?: string;
  stepDelay?: number;
  y?: number;
}

/**
 * Staggered list/grid item entrance with tight editorial cadence.
 */
export function EditorialStaggerItem({
  children,
  index,
  className,
  stepDelay = 0.045,
  y = 10,
}: EditorialStaggerItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: 0.38,
        delay: Math.min(index * stepDelay, 0.25),
        ease: EDITORIAL_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
