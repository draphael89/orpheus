import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { MemoryFragment } from './MemoryFragment';
import { useAppSelector } from '../store/store';
import { RootState } from '../types/store';

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const memoryFragmentContent: Record<string, { content: string; type: 'vinyl' | 'digital' | 'memory' | 'grief' | 'love' }> = {
  failed_uploads: {
    content: "Echoes of interrupted consciousness",
    type: 'digital',
  },
  workshop_atmosphere: {
    content: "Cathedral of lost souls",
    type: 'memory',
  },
  beatrice_memory: {
    content: "Rain-soaked turntable",
    type: 'love',
  },
  anna_perez_mathematics: {
    content: "Pure mathematics of consciousness",
    type: 'digital',
  },
  emily_chen_transformation: {
    content: "Mozart becoming something else",
    type: 'grief',
  },
  failed_upload_chorus: {
    content: "A chorus of the almost-saved",
    type: 'digital',
  },
  beatrice_first_meeting: {
    content: "Water dripping from dark curls",
    type: 'love',
  },
  turntable_repair: {
    content: "Sometimes scratches make it real",
    type: 'vinyl',
  },
  rain_memory: {
    content: "The sound of possibility",
    type: 'memory',
  },
};

export const MemoryFragmentContainer = () => {
  const activeMemoryFragments = useAppSelector((state: RootState) => state.narrative.activeMemoryFragments);

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 2,
        maxHeight: 'calc(100vh - 40px)',
        overflowY: 'auto',
        p: 2,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(0,0,0,0.1)',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '4px',
        },
      }}
    >
      {activeMemoryFragments.map((fragmentId) => {
        const fragmentData = memoryFragmentContent[fragmentId];
        if (!fragmentData) return null;

        return (
          <MemoryFragment
            key={fragmentId}
            content={fragmentData.content}
            type={fragmentData.type}
            isActive={true}
          />
        );
      })}
    </Box>
  );
}; 