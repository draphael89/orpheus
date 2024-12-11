import { Container } from '@mui/material';
import { motion } from 'framer-motion';
import { Scene } from '../components/Scene';
import { MemoryFragmentContainer } from '../components/MemoryFragmentContainer';
import { SceneHistory } from '../components/SceneHistory';
import { useAppSelector, useAppDispatch } from '../store/store';
import { makeChoice } from '../store/slices/narrativeSlice';
import { useSceneTransition } from '../hooks/useSceneTransition';

const MotionDiv = motion.div;

export default function Home() {
  const dispatch = useAppDispatch();
  const currentScene = useAppSelector((state) => state.narrative.currentScene);
  const { transitionToScene } = useSceneTransition();

  const handleChoiceSelect = async (choiceId: string) => {
    if (!currentScene) return;
    dispatch(makeChoice({ sceneId: currentScene.id, choiceId }));
    const choice = currentScene.choices.find((c) => c.id === choiceId);
    if (choice) {
      await transitionToScene(choice.nextSceneId, choice.thematicRequirements);
    }
  };

  if (!currentScene) return null;

  return (
    <Container maxWidth={false} disableGutters>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          paddingTop: 32,
          paddingBottom: 32,
          textAlign: 'center',
        }}
      >
        <Scene scene={currentScene} onChoiceSelect={handleChoiceSelect} />
        <MemoryFragmentContainer />
        <SceneHistory />
      </MotionDiv>
    </Container>
  );
} 