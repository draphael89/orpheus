import { ComponentType, ForwardRefExoticComponent } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { PaperProps, TypographyProps } from '@mui/material';

type MUIProps = PaperProps | TypographyProps;
type MotionComponentProps = {
  sx?: SxProps<Theme>;
} & MUIProps;

export function createMotionComponent<Props extends MotionComponentProps>(
  component: ComponentType<Props> | ForwardRefExoticComponent<Props>
) {
  return motion(
    component as ForwardRefExoticComponent<Props>
  ) as ComponentType<Omit<Props, keyof HTMLMotionProps<"div">> & HTMLMotionProps<"div">>;
} 