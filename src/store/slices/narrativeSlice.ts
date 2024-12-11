import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NarrativeState, ThematicElement, Scene } from '../../types/store';

const initialState: NarrativeState = {
  currentScene: null,
  visitedScenes: [],
  playerChoices: {},
  thematicIntensity: {
    vinyl: 0,
    memory: 0,
    digitalTranscendence: 0,
    love: 0,
    grief: 0,
    digital: 0,
  },
  activeMemoryFragments: [],
};

export const narrativeSlice = createSlice({
  name: 'narrative',
  initialState,
  reducers: {
    setCurrentScene: (state, action: PayloadAction<Scene>) => {
      state.currentScene = action.payload;
      state.visitedScenes.push(action.payload.id);
    },
    makeChoice: (state, action: PayloadAction<{ sceneId: string; choiceId: string }>) => {
      state.playerChoices[action.payload.sceneId] = action.payload.choiceId;
    },
    updateThematicIntensity: (state, action: PayloadAction<{ theme: ThematicElement; value: number }>) => {
      state.thematicIntensity[action.payload.theme] = action.payload.value;
    },
    addMemoryFragment: (state, action: PayloadAction<string>) => {
      state.activeMemoryFragments.push(action.payload);
    },
    removeMemoryFragment: (state, action: PayloadAction<string>) => {
      state.activeMemoryFragments = state.activeMemoryFragments.filter(
        (fragment: string) => fragment !== action.payload
      );
    },
  },
});

export const {
  setCurrentScene,
  makeChoice,
  updateThematicIntensity,
  addMemoryFragment,
  removeMemoryFragment,
} = narrativeSlice.actions;

export default narrativeSlice.reducer; 