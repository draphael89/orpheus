import { HTMLMotionProps } from 'framer-motion';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { PaperProps, TypographyProps } from '@mui/material';

export type MotionComponentProps = HTMLMotionProps<"div"> & {
  sx?: SxProps<Theme>;
};

export type MotionPaperProps = PaperProps & HTMLMotionProps<"div">;

export type MotionTypographyProps = TypographyProps & HTMLMotionProps<"div">;

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
    };
  };
} 