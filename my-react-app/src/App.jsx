// C:\Users\cmaxx\Improved-timer\Improved-timer\my-react-app\src\App.jsx
import React from 'react';
import { SettingsProvider } from './components/context/SettingsContext';
import { DataProvider } from './components/context/DataContext';
import FocusTimer from './components/FocusTimer';
import './App.css';

function App() {
  return (
    <SettingsProvider>
      <DataProvider>
        <FocusTimer />
      </DataProvider>
    </SettingsProvider>
  );
}

export default App;