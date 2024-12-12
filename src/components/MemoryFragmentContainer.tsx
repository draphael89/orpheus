import React from 'react';
import { Typography, Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import TimelineIcon from '@mui/icons-material/Timeline';
import { MotionPaper, memoryFragmentMotion } from '@/utils/motion';

export const MemoryFragmentContainer: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'fixed',
        top: isMobile ? 'auto' : 20,
        bottom: { xs: 20, md: 'auto' },
        right: 20,
        zIndex: 1000,
      }}
    >
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          backgroundColor: 'background.paper',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <TimelineIcon />
      </IconButton>

      <AnimatePresence>
        {isOpen && (
          <MotionPaper
            {...memoryFragmentMotion.container}
            elevation={0}
            sx={{
              position: 'absolute',
              top: { xs: 'auto', md: 0 },
              bottom: { xs: '100%', md: 'auto' },
              right: 0,
              mb: { xs: 2, md: 0 },
              width: { xs: '90vw', sm: 400 },
              maxHeight: '80vh',
              overflow: 'auto',
              backgroundColor: 'background.paper',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              p: 3,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.light' }}>
              Memory Timeline
            </Typography>
            <Box sx={{ mt: 2 }}>
              {/* Memory fragments would be mapped here */}
              <Typography variant="body2" color="text.secondary">
                Your journey&apos;s memories will appear here...
              </Typography>
            </Box>
          </MotionPaper>
        )}
      </AnimatePresence>
    </Box>
  );
}; 