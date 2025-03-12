// C:\Users\cmaxx\Improved-timer\Improved-timer\my-react-app\src\components\settings\ThemeSelector.jsx
import React, { useContext } from 'react';
import { Sun, Moon } from 'lucide-react';
import { SettingsContext } from '../context/SettingsContext';

const ThemeSelector = () => {
  const { settings, dispatchSettings } = useContext(SettingsContext);
  
  const setTheme = (theme) => {
    dispatchSettings({ type: 'UPDATE_THEME', payload: theme });
  };
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Theme</h3>
      <div className="flex gap-2">
        <button 
          onClick={() => setTheme('light')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            settings.theme === 'light' 
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' 
              : 'bg-zinc-100 dark:bg-zinc-800'
          }`}
        >
          <Sun size={16} />
          Light
        </button>
        <button 
          onClick={() => setTheme('dark')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            settings.theme === 'dark' 
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100' 
              : 'bg-zinc-100 dark:bg-zinc-800'
          }`}
        >
          <Moon size={16} />
          Dark
        </button>
      </div>
    </div>
  );
};

export default ThemeSelector;