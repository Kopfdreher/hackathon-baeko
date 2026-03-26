import { motion } from 'framer-motion';
import { Check, Flame, Sparkles } from 'lucide-react';
import type { Task } from '../lib/types';
import { cn } from '../lib/utils';

interface TaskItemProps {
  task: Task;
  onComplete: (id: string) => void;
}

export function TaskItem({ task, onComplete }: TaskItemProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-300",
        task.completed 
          ? "bg-bakery-50 border-bakery-100 opacity-60" 
          : "bg-white border-bakery-100 hover:border-bakery-300 hover:shadow-md"
      )}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => onComplete(task.id)}
          disabled={task.completed}
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300",
            task.completed 
              ? "bg-bakery-500 border-bakery-500 text-white scale-90" 
              : "border-bakery-300 text-transparent hover:border-bakery-500 hover:bg-bakery-50"
          )}
        >
          <Check size={16} strokeWidth={3} />
        </button>
        
        <div className="flex flex-col gap-1">
          <h3 className={cn(
            "font-semibold text-lg transition-all",
            task.completed ? "text-bakery-400 line-through decoration-bakery-300" : "text-bakery-900"
          )}>
            {task.title}
          </h3>
          <p className="text-sm text-bakery-500">{task.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-bakery-100 text-bakery-700 font-bold text-xs">
            <span className="text-bakery-500">{task.xpReward}</span>
            <Sparkles size={12} className="text-yellow-500 fill-yellow-500" />
        </div>
        
        {task.type === 'baking' && <Flame size={16} className="text-orange-400 opacity-50" />}
      </div>
    </motion.div>
  );
}
