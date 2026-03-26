import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useGame } from '../hooks/useGamification';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { user } = useGame(); // In a real app, we'd fetch historical data here

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const nextMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  const prevMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));

  // Mock data for completed tasks/streak (randomly assign for demo)
  const getDayStatus = (date: Date) => {
    // Just for demo purposes, assume some days have full completion
    const dayNum = date.getDate();
    if (dayNum % 3 === 0) return 'perfect';
    if (dayNum % 2 === 0) return 'good';
    return 'missed';
  };

  return (
    <div className="flex-1 p-6 md:p-8 flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-bakery-900">
          Consistency is Key
        </h1>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-bakery-100 rounded-full">←</button>
          <span className="text-lg font-medium w-32 text-center">
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button onClick={nextMonth} className="p-2 hover:bg-bakery-100 rounded-full">→</button>
        </div>
      </header>

      <div className="grid grid-cols-7 gap-2 md:gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-bakery-400 font-medium text-sm py-2">
            {day}
          </div>
        ))}
        
        {daysInMonth.map((day, i) => {
          const status = getDayStatus(day);
          const isToday = isSameDay(day, new Date());
          
          return (
            <motion.div
              key={day.toISOString()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.02 }}
              className={`
                aspect-square rounded-xl flex flex-col items-center justify-center relative group cursor-pointer
                ${!isSameMonth(day, currentDate) ? 'opacity-30' : ''}
                ${isToday ? 'border-2 border-bakery-500 bg-white' : 'bg-white hover:bg-bakery-50'}
              `}
            >
              <span className={`text-sm ${isToday ? 'font-bold text-bakery-800' : 'text-bakery-600'}`}>
                {format(day, 'd')}
              </span>
              
              {/* Status Indicator */}
              <div className={`
                w-2 h-2 rounded-full mt-1
                ${status === 'perfect' ? 'bg-green-500' : 
                  status === 'good' ? 'bg-yellow-400' : 'bg-bakery-200'}
              `} />
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-bakery-100">
        <h3 className="font-semibold text-lg mb-4 text-bakery-800">Streak Summary</h3>
        <div className="flex gap-8 justify-around">
            <div className="text-center">
                <div className="text-4xl font-bold text-orange-500">{user.streak}</div>
                <div className="text-sm text-bakery-500">Current Streak</div>
            </div>
            <div className="text-center">
                <div className="text-4xl font-bold text-bakery-400">12</div>
                <div className="text-sm text-bakery-500">Longest Streak</div>
            </div>
        </div>
      </div>
    </div>
  );
}
