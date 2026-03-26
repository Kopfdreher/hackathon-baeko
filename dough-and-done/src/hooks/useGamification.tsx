import { createContext, useContext, useEffect, useState } from "react";
import { DAILY_TASKS, LEVEL_THRESHOLDS } from "../lib/types";
import type { UserState, Task } from "../lib/types";
import { format, isSameDay, parseISO } from "date-fns";
import confetti from "canvas-confetti";

interface GameContextType {
  user: UserState;
  tasks: Task[];
  completeTask: (taskId: string) => void;
  resetTasks: () => void;
  levelProgress: number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const INITIAL_USER: UserState = {
  xp: 0,
  level: 1,
  streak: 1,
  lastLogin: new Date().toISOString(),
  tasksCompletedToday: 0,
  totalCustomersServed: 124, // Mock start
};

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserState>(() => {
    const saved = localStorage.getItem("bakery-user");
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("bakery-tasks");
    const savedDate = localStorage.getItem("bakery-date");
    const today = format(new Date(), "yyyy-MM-dd");

    if (saved && savedDate === today) {
      return JSON.parse(saved);
    }
    return DAILY_TASKS;
  });

  useEffect(() => {
    localStorage.setItem("bakery-user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("bakery-tasks", JSON.stringify(tasks));
    localStorage.setItem("bakery-date", format(new Date(), "yyyy-MM-dd"));
  }, [tasks]);

  // Check for streak updates on load
  useEffect(() => {
    const lastLogin = parseISO(user.lastLogin);
    const now = new Date();
    
    if (!isSameDay(lastLogin, now)) {
      // It's a new day
      const isConsecutive = isSameDay(lastLogin, new Date(now.setDate(now.getDate() - 1)));
      
      setUser(prev => ({
        ...prev,
        lastLogin: new Date().toISOString(),
        streak: isConsecutive ? prev.streak + 1 : 1,
        tasksCompletedToday: 0
      }));
      
      // Reset tasks for the new day if they weren't already reset by the initial state logic
      // (The initial state logic handles full reloads, this handles keeping the tab open overnight)
      setTasks(DAILY_TASKS);
    }
  }, []);

  const completeTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId && !t.completed) {
        // Trigger rewards
        const newXp = user.xp + t.xpReward;
        let newLevel = user.level;
        
        // Level up logic
        const nextThreshold = LEVEL_THRESHOLDS[user.level];
        if (nextThreshold && newXp >= nextThreshold) {
          newLevel++;
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FFA500', '#ffffff']
          });
        } else {
             // Small confetti for task
             confetti({
                particleCount: 30,
                spread: 50,
                origin: { y: 0.7 },
                colors: ['#a18072', '#eaddd7'] // Bakery colors
              });
        }

        setUser(u => ({
          ...u,
          xp: newXp,
          level: newLevel,
          tasksCompletedToday: u.tasksCompletedToday + 1,
          totalCustomersServed: u.totalCustomersServed + Math.floor(Math.random() * 5) // Mock customer increment
        }));

        return { ...t, completed: true };
      }
      return t;
    }));
  };

  const resetTasks = () => {
    setTasks(DAILY_TASKS);
  };

  // Calculate progress to next level (0 to 100)
  const currentLevelBase = LEVEL_THRESHOLDS[user.level - 1] || 0;
  const nextLevelThreshold = LEVEL_THRESHOLDS[user.level] || (currentLevelBase + 500);
  const levelProgress = Math.min(100, Math.max(0, ((user.xp - currentLevelBase) / (nextLevelThreshold - currentLevelBase)) * 100));

  return (
    <GameContext.Provider value={{ user, tasks, completeTask, resetTasks, levelProgress }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};
