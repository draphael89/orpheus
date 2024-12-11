export interface Scene {
  id: string;
  title: string;
  content: string;
  choices: Choice[];
  thematicElements: ThematicElement[];
  musicReferences: string[];
  memoryFragments: string[];
}

export interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
  thematicRequirements: ThematicElement[];
}

export interface RootState {
  narrative: NarrativeState;
  history: HistoryState;
}

export interface NarrativeState {
  currentScene: Scene | null;
  visitedScenes: string[];
  playerChoices: Record<string, string>;
  thematicIntensity: Record<ThematicElement, number>;
  activeMemoryFragments: string[];
}

export interface HistoryState {
  entries: Array<{
    scene: Scene;
    choiceMade: {
      id: string;
      text: string;
    } | null;
    timestamp: number;
  }>;
  currentIndex: number;
}

export type ThematicElement = 'vinyl' | 'memory' | 'digitalTranscendence' | 'love' | 'grief' | 'digital';

export interface ThematicState {
  intensity: Record<ThematicElement, number>;
  activeElements: ThematicElement[];
} 