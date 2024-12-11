import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Scene } from '../../types/store';

interface HistoryEntry {
  scene: Scene;
  choiceMade: {
    id: string;
    text: string;
  } | null;
  timestamp: number;
}

interface HistoryState {
  entries: HistoryEntry[];
  currentIndex: number;
}

const initialState: HistoryState = {
  entries: [],
  currentIndex: -1,
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistoryEntry: (
      state,
      action: PayloadAction<{
        scene: Scene;
        choiceMade: { id: string; text: string } | null;
      }>
    ) => {
      // Remove any future history if we're not at the latest point
      if (state.currentIndex < state.entries.length - 1) {
        state.entries = state.entries.slice(0, state.currentIndex + 1);
      }

      state.entries.push({
        scene: action.payload.scene,
        choiceMade: action.payload.choiceMade,
        timestamp: Date.now(),
      });
      state.currentIndex = state.entries.length - 1;
    },
    navigateHistory: (state, action: PayloadAction<number>) => {
      const targetIndex = action.payload;
      if (targetIndex >= 0 && targetIndex < state.entries.length) {
        state.currentIndex = targetIndex;
      }
    },
    clearHistory: (state) => {
      state.entries = [];
      state.currentIndex = -1;
    },
  },
});

export const { addHistoryEntry, navigateHistory, clearHistory } = historySlice.actions;

export default historySlice.reducer; 