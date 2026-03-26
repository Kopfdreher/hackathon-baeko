import { useGame } from '../hooks/useGamification';
import { motion, AnimatePresence } from 'framer-motion';
import { TaskItem } from './TaskItem';

export function Dashboard() {
  const { tasks, completeTask } = useGame();
  
  const completedCount = tasks.filter(t => t.completed).length;
  const progress = (completedCount / tasks.length) * 100;

  return (
    <div className="flex-1 p-6 md:p-8 flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <header className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold text-bakery-900">
          Good Morning, Baker!
        </h1>
        <p className="text-bakery-600">
          You have {tasks.length - completedCount} tasks remaining today. Keep that oven hot!
        </p>
        
        <div className="w-full bg-bakery-200 rounded-full h-4 overflow-hidden relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full"
          />
        </div>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-bakery-800">Today's Batch</h2>
        
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {tasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onComplete={completeTask} 
              />
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
