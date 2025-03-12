// C:\Users\cmaxx\Improved-timer\Improved-timer\my-react-app\src\components\settings\SettingsPanel.jsx
import React, { useContext } from 'react';
import { X } from 'lucide-react';
import { SettingsContext } from '../context/SettingsContext';
import { DataContext } from '../context/DataContext';
import ThemeSelector from './ThemeSelector';
import TimerPresets from './TimerPresets';
import NotificationSettings from './NotificationSettings';
import DataManager from '../data/DataManager';

const SettingsPanel = ({ onClose }) => {
  const { settings, dispatchSettings } = useContext(SettingsContext);
  const { data, dispatchData } = useContext(DataContext);
  const dataManager = DataManager();
  
  // Reset all settings to defaults
  const resetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
      dispatchSettings({ type: 'RESET_SETTINGS' });
    }
  };
  
  // Import settings from file
  const importSettings = (event) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = e => {
      try {
        const parsedSettings = JSON.parse(e.target.result);
        
        // Validate the imported settings structure
        if (
          parsedSettings &&
          typeof parsedSettings === 'object' &&
          parsedSettings.theme &&
          parsedSettings.presets &&
          typeof parsedSettings.notifications === 'boolean'
        ) {
          dispatchSettings({ type: 'IMPORT_SETTINGS', payload: parsedSettings });
          alert('Settings imported successfully!');
        } else {
          alert('Invalid settings format. Import failed.');
        }
      } catch (error) {
        console.error("Error parsing imported settings:", error);
        alert('Error importing settings. Please try again with a valid file.');
      }
    };
  };
  
  // Export settings as JSON
  const exportSettings = () => {
    const settingsStr = JSON.stringify(settings);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(settingsStr)}`;
    
    const exportFileDefaultName = `focus-timer-settings-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Settings</h2>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Theme Settings */}
      <ThemeSelector />
      
      {/* Notification Settings */}
      <NotificationSettings />
      
      {/* Timer Presets */}
      <TimerPresets />
      
      {/* Data Management */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Data Management</h3>
        
        {/* Storage usage display */}
        <div className="mb-4">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Storage Usage</div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full mt-1 mb-1">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${Math.min(dataManager.storageInfo.percentUsed || 0, 100)}%` }}
            ></div>
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            {dataManager.storageInfo.available 
              ? `${(dataManager.storageInfo.app / 1024).toFixed(2)} KB used by Focus Timer`
              : 'Storage info not available'}
          </div>
        </div>
        
        <div className="space-y-2">
          {/* Export/Import Data buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={dataManager.exportData}
              className="p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-sm"
            >
              Export Data
            </button>
            <label className="p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-sm text-center cursor-pointer">
              Import Data
              <input 
                type="file" 
                accept=".json" 
                onChange={dataManager.importData} 
                className="hidden" 
              />
            </label>
          </div>
          
          {/* Export/Import Settings buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={exportSettings}
              className="p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-sm"
            >
              Export Settings
            </button>
            <label className="p-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-sm text-center cursor-pointer">
              Import Settings
              <input 
                type="file" 
                accept=".json" 
                onChange={importSettings} 
                className="hidden" 
              />
            </label>
          </div>
          
          {/* Reset buttons */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={resetSettings}
              className="p-2 bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-100 hover:bg-amber-200 dark:hover:bg-amber-800 rounded text-sm"
            >
              Reset Settings
            </button>
            <button
              onClick={dataManager.clearAllData}
              className="p-2 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-800 rounded text-sm"
            >
              Reset Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;