import { Paper, Typography, Box } from '@mui/material';
import { ThematicElement } from '../types/store';
import { createMotionComponent } from '../utils/motion';

const MotionPaper = createMotionComponent(Paper);

interface MemoryFragmentProps {
  content: string;
  type: ThematicElement;
  isActive: boolean;
}

const fragmentVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -10,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    rotate: 5,
    transition: {
      duration: 0.3,
    },
  },
};

const getFragmentStyle = (type: ThematicElement): Record<string, string | number> => {
  const styles: Record<ThematicElement, Record<string, string | number>> = {
    vinyl: {
      background: 'linear-gradient(45deg, #2A2A2A 30%, #404040 90%)',
      borderRadius: '50%',
      boxShadow: '0 0 15px rgba(0,0,0,0.3)',
    },
    digital: {
      background: 'linear-gradient(135deg, #1a237e 30%, #0d47a1 90%)',
      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    },
    memory: {
      background: 'linear-gradient(45deg, #4a148c 30%, #7b1fa2 90%)',
      borderRadius: '8px',
    },
    grief: {
      background: 'linear-gradient(45deg, #1a1a1a 30%, #333333 90%)',
      clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
    },
    love: {
      background: 'linear-gradient(45deg, #b71c1c 30%, #c62828 90%)',
      borderRadius: '16px',
    },
    digitalTranscendence: {
      background: 'linear-gradient(135deg, #006064 30%, #00838f 90%)',
      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
    },
  };

  return styles[type] || styles.memory;
};

export const MemoryFragment = ({ content, type, isActive }: MemoryFragmentProps) => {
  return (
    <MotionPaper
      variants={fragmentVariants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      whileHover="hover"
      elevation={3}
      sx={{
        position: 'relative',
        width: 150,
        height: 150,
        m: 1,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
        ...getFragmentStyle(type),
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(2px)',
          zIndex: 1,
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        {content}
      </Typography>
    </MotionPaper>
  );
}; 