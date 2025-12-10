import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes@0.4.6';

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      variant="outline"
      size="icon"
      className="h-9 w-9 sm:h-10 sm:w-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 hover:scale-105 transition-all duration-200"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
      ) : (
        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[#225b73]" />
      )}
    </Button>
  );
}