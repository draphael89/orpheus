import { forwardRef, type ElementType } from 'react';
import { motion, type ForwardRefComponent, type MotionProps } from 'framer-motion';
import { Paper, Button, Box, Container } from '@mui/material';
import type { MotionPaperProps, MotionButtonProps, MotionBoxProps, MotionContainerProps } from '../types/motion';

// Refined type constraints for components
type ValidComponent = ElementType | React.ForwardRefExoticComponent<unknown>;
type MotionComponentProps<T extends ValidComponent> = Omit<React.ComponentProps<T>, keyof MotionProps>;

// Helper function to create motion components
export function createMotionComponent<
  T extends ValidComponent,
  P extends MotionProps
>(
  Component: T,
  displayName: string
) {
  type Props = MotionComponentProps<T> & P;
  type Ref = T extends React.ComponentType<unknown>
    ? React.ComponentRef<T>
    : HTMLElement;
    
  // Properly type the motion component based on whether it's an HTML element or React component
  const MotionComp = motion(
    Component as unknown as React.ForwardRefExoticComponent<unknown>
  ) as ForwardRefComponent<Ref, Props>;

  const MotionComponent = forwardRef<Ref, Props>((props, ref) => {
    const motionProps = {
      ...props,
      ref
    } as React.ComponentProps<typeof MotionComp>;

    return <MotionComp {...motionProps} />;
  });

  MotionComponent.displayName = displayName;
  return MotionComponent;
}

// Pre-created Motion Components
export const MotionComponent = motion.div;
export const MotionPaper = createMotionComponent<typeof Paper, MotionPaperProps>(Paper, 'MotionPaper');
export const MotionButton = createMotionComponent<typeof Button, MotionButtonProps>(Button, 'MotionButton');
export const MotionBox = createMotionComponent<typeof Box, MotionBoxProps>(Box, 'MotionBox');
export const MotionContainer = createMotionComponent<typeof Container, MotionContainerProps>(Container, 'MotionContainer');

// Animation Variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
};

// Helper function to create stagger children variants
export const createStaggerChildren = (delay: number = 0.1) => ({
  container: {
    animate: {
      transition: {
        staggerChildren: delay,
        delayChildren: 0.2
      }
    }
  },
  item: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }
});

export const staggerChildren = createStaggerChildren();

// Component-specific motion configs
export const memoryFragmentMotion = {
  container: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  item: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  }
};

export const interactiveMotion = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
};

export const transitions = {
  default: { duration: 0.6, ease: 'easeOut' },
  quick: { duration: 0.3, ease: 'easeOut' },
  spring: { type: "spring", stiffness: 300, damping: 30 }
};
