// C:\Users\cmaxx\Improved-timer\Improved-timer\my-react-app\src\components\context\SettingsContext.jsx
import React, { createContext, useReducer, useEffect } from 'react';
import { StorageHelper } from '../data/StorageHelper';

// Create settings context
export const SettingsContext = createContext();

// Initial settings state
const initialSettings = {
  theme: 'light',
  notifications: true,
  sounds: {
    enabled: true,
    timerEnd: 'bell',
    timerStart: 'click',
    volume: 0.7
  },
  presets: {
    pomodoro: { work: 25, break: 5 },
    shortFocus: { work: 15, break: 3 },
    longFocus: { work: 50, break: 10 },
    custom: { work: 30, break: 5 }
  },
  currentPreset: 'pomodoro'
};

// Settings reducer function
function settingsReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_THEME':
      return { ...state, theme: action.payload };
    case 'UPDATE_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'UPDATE_SOUNDS':
      return { ...state, sounds: { ...state.sounds, ...action.payload } };
    case 'UPDATE_PRESET':
      return { 
        ...state, 
        presets: { 
          ...state.presets, 
          [action.payload.name]: action.payload.values 
        } 
      };
    case 'SET_CURRENT_PRESET':
      return { ...state, currentPreset: action.payload };
    case 'IMPORT_SETTINGS':
      return { ...action.payload };
    case 'RESET_SETTINGS':
      return initialSettings;
    default:
      return state;
  }
}

// Settings provider component
export const SettingsProvider = ({ children }) => {
  // Use reducer for settings state management
  const [settings, dispatchSettings] = useReducer(
    settingsReducer,
    initialSettings,
    () => {
      // Load settings from localStorage on init
      return StorageHelper.loadData('focusTimer.settings', initialSettings);
    }
  );
  
  // Save settings to localStorage when they change
  useEffect(() => {
    StorageHelper.saveData('focusTimer.settings', settings);
    
    // Apply theme to document when settings change
    document.documentElement.className = settings.theme;
  }, [settings]);
  
  return (
    <SettingsContext.Provider value={{ settings, dispatchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};