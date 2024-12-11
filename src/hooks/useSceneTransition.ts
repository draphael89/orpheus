import { useCallback } from 'react';
import { useAppDispatch } from '../store/store';
import { setCurrentScene, updateThematicIntensity } from '../store/slices/narrativeSlice';
import { allScenes } from '../data/scenes/chapter1';
import { ThematicElement } from '../types/store';

const THEMATIC_INTENSITY_INCREASE = 0.2;

export const useSceneTransition = () => {
  const dispatch = useAppDispatch();

  const transitionToScene = useCallback(
    async (nextSceneId: string, chosenThemes: ThematicElement[]) => {
      const nextScene = allScenes[nextSceneId];
      
      if (!nextScene) {
        console.error(`Scene ${nextSceneId} not found`);
        return;
      }

      // Update thematic intensities based on the choice made
      chosenThemes.forEach((theme) => {
        dispatch(
          updateThematicIntensity({
            theme,
            value: THEMATIC_INTENSITY_INCREASE,
          })
        );
      });

      // Add a slight delay for the animation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Transition to the next scene
      dispatch(setCurrentScene(nextScene));
    },
    [dispatch]
  );

  return { transitionToScene };
}; 