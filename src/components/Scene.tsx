import { Box, Paper, Typography } from '@mui/material';
import { Scene as SceneType } from '../types/store';
import { createMotionComponent } from '../utils/motion';

const MotionPaper = createMotionComponent(Paper);
const MotionTypography = createMotionComponent(Typography);

interface SceneProps {
  scene: SceneType;
  onChoiceSelect: (choiceId: string) => void;
}

const sceneVariants = {
  exit: {
    opacity: 0,
    y: 50,
  },
  enter: {
    opacity: 1,
    y: 0,
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const Scene = ({ scene, onChoiceSelect }: SceneProps) => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
      <MotionPaper
        variants={sceneVariants}
        initial="exit"
        animate="enter"
        exit="exit"
        elevation={3}
        sx={{ p: 4, bgcolor: 'background.paper' }}
      >
        <MotionTypography
          variant="h4"
          gutterBottom
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {scene.title}
        </MotionTypography>

        <MotionTypography
          variant="body1"
          sx={{ mb: 4 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {scene.content}
        </MotionTypography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {scene.choices.map((choice) => (
            <MotionPaper
              key={choice.id}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              elevation={2}
              onClick={() => onChoiceSelect(choice.id)}
              sx={{
                p: 2,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Typography variant="body1">{choice.text}</Typography>
            </MotionPaper>
          ))}
        </Box>
      </MotionPaper>
    </Box>
  );
}; 