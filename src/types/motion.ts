import { HTMLMotionProps } from 'framer-motion';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { PaperProps, ButtonProps, BoxProps, ContainerProps } from '@mui/material';

export type MotionComponentProps = HTMLMotionProps<"div"> & {
  sx?: SxProps<Theme>;
};

export type MotionPaperProps = HTMLMotionProps<"div"> & PaperProps;
export type MotionButtonProps = HTMLMotionProps<"button"> & ButtonProps;
export type MotionBoxProps = HTMLMotionProps<"div"> & BoxProps;
export type MotionContainerProps = HTMLMotionProps<"div"> & ContainerProps;

export interface AnimationVariants {
  [key: string]: {
    opacity?: number;
    scale?: number;
    rotate?: number;
    x?: number;
    y?: number;
    filter?: string;
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string;
      staggerChildren?: number;
      delayChildren?: number;
    };
  };
} 