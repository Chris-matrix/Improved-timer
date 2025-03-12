// C:\Users\cmaxx\Improved-timer\Improved-timer\my-react-app\src\components\context\DataContext.jsx
import React, { createContext, useReducer, useEffect } from 'react';
import { StorageHelper } from '../data/StorageHelper';

// Create data context
export const DataContext = createContext();

// Initial data state
const initialData = {
  sessions: [],
  achievements: {
    totalFocusTime: 0,
    completedSessions: 0,
    streakDays: 0,
    lastSessionDate: null
  },
  analytics: {
    weeklyData: Array(7).fill(0),
    monthlyData: Array(30).fill(0),
    averageSessionLength: 0
  }
};

// Data reducer function
function dataReducer(state, action) {
  switch (action.type) {
    case 'ADD_SESSION':
      const newSessions = [...state.sessions, action.payload];
      
      // Calculate new analytics
      const totalTime = newSessions.reduce((acc, session) => acc + session.duration, 0);
      const avgLength = newSessions.length > 0 ? totalTime / newSessions.length : 0;
      
      // Update weekly data
      const dayIndex = new Date().getDay();
      const newWeeklyData = [...state.analytics.weeklyData];
      newWeeklyData[dayIndex] += action.payload.duration;
      
      // Check if streak continues
      const today = new Date().toDateString();
      const lastDate = state.achievements.lastSessionDate;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const isStreak = lastDate === yesterday.toDateString() || !lastDate;
      
      return {
        ...state,
        sessions: newSessions,
        achievements: {
          ...state.achievements,
          totalFocusTime: state.achievements.totalFocusTime + action.payload.duration,
          completedSessions: state.achievements.completedSessions + 1,
          streakDays: isStreak ? state.achievements.streakDays + 1 : 1,
          lastSessionDate: today
        },
        analytics: {
          ...state.analytics,
          weeklyData: newWeeklyData,
          averageSessionLength: avgLength
        }
      };
      
    case 'CLEAR_DATA':
      return initialData;
      
    case 'IMPORT_DATA':
      // Validate the data structure before importing
      return { ...action.payload };
      
    default:
      return state;
  }
}

// Data provider component
export const DataProvider = ({ children }) => {
  // Use reducer for data state management
  const [data, dispatchData] = useReducer(
    dataReducer,
    initialData,
    () => {
      // Load data from localStorage on init
      return StorageHelper.loadData('focusTimer.data', initialData);
    }
  );
  
  // Save data to localStorage when it changes
  useEffect(() => {
    StorageHelper.saveData('focusTimer.data', data);
  }, [data]);
  
  return (
    <DataContext.Provider value={{ data, dispatchData }}>
      {children}
    </DataContext.Provider>
  );
};