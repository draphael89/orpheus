import React, { Suspense } from 'react';
import { Typography, Box, IconButton, Drawer, CircularProgress } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import HistoryIcon from '@mui/icons-material/History';
import { useAppSelector } from '@/store/store';
import { Scene } from '@/types/store';
import { Logger } from '@/utils/logger';
import { MotionPaper, MotionBox, slideInLeft, fadeIn, transitions, createStaggerChildren } from '@/utils/motion';

// Create stagger animation config
const staggerConfig = createStaggerChildren(0.1);
const { container } = staggerConfig;

interface HistoryEntry {
  scene: Scene;
  choiceMade: { id: string; text: string; } | null;
  timestamp: number;
}

interface HistoryItemProps {
  entry: HistoryEntry;
  index: number;
}

const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" p={4}>
    <CircularProgress size={24} />
  </Box>
);

const HistoryItem: React.FC<HistoryItemProps> = React.memo(({ entry, index }) => {
  React.useEffect(() => {
    Logger.debug(`Rendering history item: ${entry.scene.id}`);
  }, [entry.scene.id]);

  return (
    <MotionPaper
      {...slideInLeft}
      transition={{ ...transitions.quick, delay: index * 0.1 }}
      sx={{
        p: 2,
        mb: 2,
        backgroundColor: 'background.paper',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          transform: 'translateX(4px)',
        },
      }}
    >
      <Typography variant="subtitle1" sx={{ color: 'primary.light', mb: 1 }}>
        {entry.scene.title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: 1.6,
        }}
      >
        {entry.scene.content}
      </Typography>
    </MotionPaper>
  );
});

HistoryItem.displayName = 'HistoryItem';

const HistoryContent: React.FC<{ history: HistoryEntry[] }> = React.memo(({ history }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'primary.light' }}>
        Journey History
      </Typography>
      <MotionBox
        {...container}
        {...fadeIn}
        transition={transitions.default}
        sx={{ mt: 3 }}
      >
        <AnimatePresence mode="popLayout">
          {history.map((entry, index) => (
            <HistoryItem key={entry.scene.id} entry={entry} index={index} />
          ))}
        </AnimatePresence>
      </MotionBox>
    </Box>
  );
});

HistoryContent.displayName = 'HistoryContent';

export const SceneHistory: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const historyEntries = useAppSelector((state) => state.history.entries);

  const handleToggle = React.useCallback(() => {
    Logger.info(`Toggling history panel: ${isOpen ? 'close' : 'open'}`);
    setIsOpen(prev => !prev);
  }, [isOpen]);

  const handleClose = React.useCallback(() => {
    Logger.info('Closing history panel');
    setIsOpen(false);
  }, []);

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: { xs: 'auto', md: 20 },
          bottom: { xs: 20, md: 'auto' },
          left: 20,
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={handleToggle}
          aria-label="Toggle history"
          sx={{
            backgroundColor: 'background.paper',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transform: 'scale(1.1)',
            },
          }}
        >
          <HistoryIcon />
        </IconButton>
      </Box>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: { xs: '90vw', sm: 400 },
            backgroundColor: 'background.paper',
            backdropFilter: 'blur(10px)',
            border: 'none',
            boxShadow: 'none',
          },
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <HistoryContent history={historyEntries} />
        </Suspense>
      </Drawer>
    </>
  );
};