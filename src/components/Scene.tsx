import React, { Suspense } from 'react';
import { Typography, Box, Container, CircularProgress } from '@mui/material';
import { Scene as SceneType } from '@/types/store';
import { motion } from 'framer-motion';
import { Logger } from '@/utils/logger';
import { MotionPaper, MotionButton, slideUp, interactiveMotion, fadeIn, transitions } from '@/utils/motion';

interface SceneProps {
  scene: SceneType;
  onChoiceSelect: (choiceId: string) => void;
}

const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
    <CircularProgress />
  </Box>
);

const SceneContent: React.FC<SceneProps> = React.memo(({ scene, onChoiceSelect }) => {
  const handleChoiceClick = React.useCallback((choiceId: string) => {
    Logger.info(`Selected choice: ${choiceId} in scene: ${scene.id}`);
    onChoiceSelect(choiceId);
  }, [onChoiceSelect, scene.id]);

  return (
    <MotionPaper
      {...slideUp}
      transition={transitions.default}
      elevation={0}
      sx={{
        p: { xs: 3, md: 6 },
        background: 'rgba(16, 23, 42, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: 4,
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          fontSize: { xs: '1.75rem', md: '2.5rem' },
          mb: 4,
          textAlign: 'center',
          color: 'primary.light',
        }}
      >
        {scene.title}
      </Typography>

      <Typography
        variant="body1"
        paragraph
        sx={{
          whiteSpace: 'pre-line',
          textAlign: 'justify',
          mb: 6,
          color: 'text.primary',
          lineHeight: 1.8,
        }}
      >
        {scene.content}
      </Typography>

      <Box
        component={motion.div}
        {...fadeIn}
        transition={{ delay: 0.3 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 4,
        }}
      >
        {scene.choices.map((choice, index) => (
          <MotionButton
            key={choice.id}
            variant="outlined"
            color="primary"
            onClick={() => handleChoiceClick(choice.id)}
            {...slideUp}
            {...interactiveMotion}
            transition={{ 
              ...transitions.quick,
              delay: index * 0.1,
              ...interactiveMotion.transition 
            }}
            sx={{
              py: 2,
              px: 4,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                borderColor: 'primary.light',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            <Typography variant="body1">{choice.text}</Typography>
          </MotionButton>
        ))}
      </Box>
    </MotionPaper>
  );
});

SceneContent.displayName = 'SceneContent';

export const Scene: React.FC<SceneProps> = (props) => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Suspense fallback={<LoadingFallback />}>
        <SceneContent {...props} />
      </Suspense>
    </Container>
  );
};