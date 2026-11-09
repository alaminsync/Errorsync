import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-1.5 p-1 rounded-full border border-purple-300 dark:border-purple-600/40 bg-purple-50 dark:bg-purple-950/60 text-slate-700 dark:text-slate-200 hover:border-purple-400 transition-all cursor-pointer text-xs font-semibold ${className}`}
      title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      aria-label="Toggle theme"
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
          theme === 'dark' ? 'bg-purple-900/80 text-purple-300' : 'bg-amber-400 text-amber-950 shadow-sm'
        }`}
      >
        {theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
      </div>
      <span className="pr-2 font-mono text-[11px] hidden sm:inline">
        {theme === 'dark' ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};
