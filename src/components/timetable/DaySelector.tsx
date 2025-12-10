import { Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { DayOfWeek, Translations } from '../../types';

interface DaySelectorProps {
  selectedDay: DayOfWeek;
  onDayChange: (day: DayOfWeek) => void;
  translations: Translations;
}

export function DaySelector({ selectedDay, onDayChange, translations }: DaySelectorProps) {
  const days: Array<{ key: DayOfWeek; label: string }> = [
    { key: 'Monday', label: translations.monday },
    { key: 'Tuesday', label: translations.tuesday },
    { key: 'Wednesday', label: translations.wednesday },
    { key: 'Thursday', label: translations.thursday },
    { key: 'Friday', label: translations.friday }
  ];

  return (
    <div className="flex space-x-1.5 sm:space-x-2 mb-3 sm:mb-4 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
      {days.map((day) => (
        <Button
          key={day.key}
          onClick={() => onDayChange(day.key)}
          variant={selectedDay === day.key ? 'default' : 'outline'}
          className={`${
            selectedDay === day.key 
              ? 'bg-[#225b73] dark:bg-gradient-to-r dark:from-violet-600 dark:to-purple-600 dark:text-white' 
              : 'dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:bg-gray-900/30'
          } text-xs sm:text-sm whitespace-nowrap min-w-[90px] sm:min-w-[110px] md:w-[130px] h-9 sm:h-10 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 touch-manipulation flex-shrink-0`}
        >
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="truncate">{day.label}</span>
        </Button>
      ))}
    </div>
  );
}