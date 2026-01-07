import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme, useThemeMode } from './ThemeProvider';

const themeOptions = [
  { id: 'light', label: 'Day', icon: Sun },
  { id: 'dark', label: 'Night', icon: Moon },
];

const ThemeToggle = ({ className = '', size = 'md' }) => {
  const theme = useTheme();
  const { mode, setMode } = useThemeMode();

  const padding = size === 'sm' ? 'px-1 py-0.5' : 'px-2 py-1';
  const gap = size === 'sm' ? 'gap-1' : 'gap-2';
  const labelClass =
    size === 'sm' ? 'text-[10px] font-medium tracking-wide' : 'text-xs sm:text-sm font-medium';

  return (
    <div
      className={`inline-flex items-center rounded-full border ${gap} ${padding} ${className}`}
      style={{
        backgroundColor: theme.background.primary,
        borderColor: theme.border.light,
        boxShadow: theme.card.shadow,
      }}
      role="group"
      aria-label="Appearance"
    >
      {themeOptions.map((option) => {
        const Icon = option.icon;
        const isActive = mode === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setMode(option.id)}
            aria-pressed={isActive}
            className={`flex items-center gap-1 rounded-full px-2 py-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
            style={{
              backgroundColor: isActive ? theme.primary.blue : 'transparent',
              color: isActive ? theme.text.white : theme.text.secondary,
              boxShadow: isActive ? theme.hover.shadow : 'none',
            }}
          >
            <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} aria-hidden="true" />
            <span className={labelClass}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;

