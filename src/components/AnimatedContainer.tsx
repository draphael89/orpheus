'use client';
import React from 'react';
import { MotionContainer } from '../utils/motion';

export interface AnimatedContainerProps {
  children: React.ReactNode;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ children }) => {
  return (
    <MotionContainer
      maxWidth={false}
      disableGutters
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        paddingTop: 32,
        paddingBottom: 32,
        textAlign: 'center',
      }}
    >
      {children}
    </MotionContainer>
  );
};

export default AnimatedContainer; 