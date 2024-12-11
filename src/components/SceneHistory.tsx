import { Box, Typography, Paper } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../store/store';
import { navigateHistory } from '../store/slices/historySlice';
import { RootState } from '../types/store';
import { createMotionComponent } from '../utils/motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TimelineIcon from '@mui/icons-material/Timeline';

const MotionPaper = createMotionComponent(Paper);

const historyItemVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
  hover: {
    scale: 1.02,
    x: 5,
    transition: {
      duration: 0.2,
    },
  },
};

const containerVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const SceneHistory = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state: RootState) => state.history.entries);
  const currentIndex = useAppSelector((state: RootState) => state.history.currentIndex);

  const handleHistoryClick = (index: number) => {
    dispatch(navigateHistory(index));
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 20,
        top: 20,
        maxWidth: 300,
        maxHeight: 'calc(100vh - 40px)',
        overflowY: 'auto',
        zIndex: 10,
      }}
    >
      <MotionPaper
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        elevation={3}
        sx={{
          p: 2,
          bgcolor: 'background.paper',
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TimelineIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Memory Timeline</Typography>
        </Box>

        {history.map((entry, index) => (
          <MotionPaper
            key={entry.timestamp}
            variants={historyItemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            elevation={2}
            sx={{
              p: 2,
              mb: 1,
              cursor: 'pointer',
              bgcolor: index === currentIndex ? 'action.selected' : 'background.paper',
              borderLeft: index === currentIndex ? '4px solid' : 'none',
              borderColor: 'primary.main',
            }}
            onClick={() => handleHistoryClick(index)}
          >
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {entry.scene.title}
            </Typography>
            {entry.choiceMade && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <ArrowBackIcon sx={{ fontSize: 16, mr: 1, transform: 'rotate(225deg)' }} />
                <Typography variant="caption" color="text.secondary">
                  {entry.choiceMade.text}
                </Typography>
              </Box>
            )}
          </MotionPaper>
        ))}
      </MotionPaper>
    </Box>
  );
}; 