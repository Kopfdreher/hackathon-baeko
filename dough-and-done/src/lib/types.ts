export interface Task {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  type: 'baking' | 'cleaning' | 'service';
}

export interface UserState {
  xp: number;
  level: number;
  streak: number;
  lastLogin: string; // ISO date
  tasksCompletedToday: number;
  totalCustomersServed: number; // Mock stat
}

export const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500];

export const DAILY_TASKS: Task[] = [
  { id: '1', title: 'Morning Dough Prep', description: 'Mix and knead the sourdough', xpReward: 50, completed: false, type: 'baking' },
  { id: '2', title: 'Oven Calibration', description: 'Check temperatures for all decks', xpReward: 20, completed: false, type: 'baking' },
  { id: '3', title: 'Display Case Setup', description: 'Arrange pastries beautifully', xpReward: 30, completed: false, type: 'service' },
  { id: '4', title: 'Mid-day Sweep', description: 'Clear flour from workspace', xpReward: 25, completed: false, type: 'cleaning' },
  { id: '5', title: 'Inventory Check', description: 'Count remaining flour bags', xpReward: 40, completed: false, type: 'service' },
  { id: '6', title: 'Deep Clean Mixers', description: 'Sanitize the main spiral mixer', xpReward: 60, completed: false, type: 'cleaning' },
];
