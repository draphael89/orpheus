import { Scene, ThematicElement } from '../../types/store';

export const chapter1Scene1: Scene = {
  id: 'ch1_scene1',
  title: 'Songs for the End of the World',
  content: `Dawn in San Francisco, 2030. Dante sits in his basement workshop, surrounded by the gentle hum of servers and the warm crackle of a vinyl record - Nina Simone's "Ne Me Quitte Pas." He's doing what he always does: trying to piece together the fragments of someone's failed upload, their digital remains scattered across his systems like broken glass. But today, his hands keep shaking. It's been exactly one year since Beatrice first walked into his shop.

The workshop feels more like a cathedral at this hour. Servers line the walls like stained glass windows, each one containing someone's interrupted eternity. Failed uploads pulse in their drives, a chorus of the almost-saved.`,
  choices: [
    {
      id: 'examine_drives',
      text: 'Examine the failed upload drives',
      nextSceneId: 'ch1_scene2',
      thematicRequirements: ['memory', 'grief'] as ThematicElement[],
    },
    {
      id: 'focus_vinyl',
      text: 'Focus on the vinyl record playing',
      nextSceneId: 'ch1_scene3',
      thematicRequirements: ['vinyl', 'love'] as ThematicElement[],
    },
  ],
  thematicElements: ['vinyl', 'memory', 'digitalTranscendence', 'grief'] as ThematicElement[],
  musicReferences: ['Nina Simone - Ne Me Quitte Pas'],
  memoryFragments: ['failed_uploads', 'workshop_atmosphere', 'beatrice_memory'],
};

export const chapter1Scene2: Scene = {
  id: 'ch1_scene2',
  title: 'The Archive of Lost Things',
  content: `Dante moves through his workshop, checking each drive's status. Some nights they speak to each other, these digital ghosts. Some nights they even sing. Tonight they're restless, their indicator lights pulsing like worried heartbeats. They know what's coming. They always know.

His hand brushes the oldest drive, the one that started everything. "Anna Perez, age 19. First failed upload. Consciousness became pure mathematics." He never deletes them. Never gives up. Some part of him believes that one day he'll understand the pattern, find a way to bring them back, make them whole.

Through his headphones, Emily Chen's last memory has stopped becoming Mozart and started becoming something else. Something that sounds almost like hope.`,
  choices: [
    {
      id: 'examine_oldest_drive',
      text: 'Study Anna Perez\'s mathematical patterns',
      nextSceneId: 'ch1_scene4',
      thematicRequirements: ['memory', 'digitalTranscendence'] as ThematicElement[],
    },
    {
      id: 'listen_emily',
      text: 'Focus on Emily Chen\'s transforming consciousness',
      nextSceneId: 'ch1_scene5',
      thematicRequirements: ['grief', 'memory'] as ThematicElement[],
    },
  ],
  thematicElements: ['memory', 'digitalTranscendence', 'grief'] as ThematicElement[],
  musicReferences: ['Mozart - Requiem', 'Emily Chen\'s Memory Symphony'],
  memoryFragments: ['anna_perez_mathematics', 'emily_chen_transformation', 'failed_upload_chorus'],
};

export const chapter1Scene3: Scene = {
  id: 'ch1_scene3',
  title: 'Vinyl Memories',
  content: `The needle traces its way through Nina Simone's grief, each pop and crackle a reminder that even recorded memories aren't perfect. Dante closes his eyes, letting the music wash over him. In the spaces between notes, he swears he can hear other sounds: rain on windows, a woman's laugh, the soft rustle of paper being folded into cranes.

A year ago, on a morning just like this, Beatrice had walked in carrying a broken turntable, water dripping from her dark curls. "It was my mother's," she'd said, cradling it like something precious. "Sometimes the scratches are what make it real."

The vinyl spins, its imperfections telling stories the digital world can never quite capture. In the workshop's dim light, the record's spiral grooves look like the path of a consciousness trying to find its way home.`,
  choices: [
    {
      id: 'remember_beatrice',
      text: 'Recall the day Beatrice first arrived',
      nextSceneId: 'ch1_scene6',
      thematicRequirements: ['love', 'memory'] as ThematicElement[],
    },
    {
      id: 'study_record',
      text: 'Examine the record\'s spiral patterns',
      nextSceneId: 'ch1_scene7',
      thematicRequirements: ['vinyl', 'digitalTranscendence'] as ThematicElement[],
    },
  ],
  thematicElements: ['vinyl', 'love', 'memory'] as ThematicElement[],
  musicReferences: ['Nina Simone - Ne Me Quitte Pas', 'Vinyl Static Patterns'],
  memoryFragments: ['beatrice_first_meeting', 'turntable_repair', 'rain_memory'],
};

export const allScenes: Record<string, Scene> = {
  ch1_scene1: chapter1Scene1,
  ch1_scene2: chapter1Scene2,
  ch1_scene3: chapter1Scene3,
}; 