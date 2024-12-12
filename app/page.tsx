'use client';
import React, { useEffect } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { Scene } from '@/components/Scene';
import { MemoryFragmentContainer } from '@/components/MemoryFragmentContainer';
import { SceneHistory } from '@/components/SceneHistory';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { makeChoice, setCurrentScene } from '@/store/slices/narrativeSlice';
import { useSceneTransition } from '@/hooks/useSceneTransition';
import dynamic from 'next/dynamic';
import { Logger } from '@/utils/logger';
import { allScenes } from '@/data/scenes/chapter1';

const AnimatedContainer = dynamic<{ children: React.ReactNode }>(
  () => {
    Logger.debug('Loading AnimatedContainer component');
    return import('@/components/AnimatedContainer').then(mod => mod.default);
  },
  { 
    ssr: false,
    loading: () => (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }
);

export default function Home() {
  const dispatch = useAppDispatch();
  const currentScene = useAppSelector((state) => state.narrative.currentScene);
  const { transitionToScene } = useSceneTransition();

  useEffect(() => {
    Logger.info('Home page mounted. Current scene:', currentScene?.id || 'No scene yet');
    if (!currentScene) {
      // Set initial scene
      const initialScene = allScenes['ch1_scene1'];
      if (initialScene) {
        Logger.info('No current scene set. Initializing to ch1_scene1.');
        dispatch(setCurrentScene(initialScene));
      } else {
        Logger.error('Initial scene not found in allScenes!');
      }
    }
  }, [currentScene, dispatch]);

  const handleChoiceSelect = async (choiceId: string) => {
    if (!currentScene) {
      Logger.warn('No currentScene available when choice selected.');
      return;
    }
    
    try {
      Logger.info(`Choice selected: ${choiceId} for scene: ${currentScene.id}`);
      dispatch(makeChoice({ sceneId: currentScene.id, choiceId }));
      
      const choice = currentScene.choices.find((c) => c.id === choiceId);
      if (choice) {
        await transitionToScene(choice.nextSceneId, choice.thematicRequirements);
      } else {
        Logger.error('Choice not found in current scene.', { choiceId, currentScene });
      }
    } catch (error) {
      Logger.error('Error handling choice selection:', error as Error);
    }
  };

  if (!currentScene) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress size={40} />
        <Typography variant="h6" style={{ marginTop: 16, color: 'white' }}>
          Loading your journey...
        </Typography>
      </Box>
    );
  }

  return (
    <AnimatedContainer>
      <Scene scene={currentScene} onChoiceSelect={handleChoiceSelect} />
      <MemoryFragmentContainer />
      <SceneHistory />
    </AnimatedContainer>
  );
}
