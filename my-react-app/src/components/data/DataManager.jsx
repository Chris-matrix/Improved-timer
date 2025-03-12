// C:\Users\cmaxx\Improved-timer\Improved-timer\my-react-app\src\components\data\DataManager.jsx
import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { StorageHelper } from './StorageHelper';

const DataManager = () => {
  const { data, dispatchData } = useContext(DataContext);
  
  // Get storage information
  const storageInfo = StorageHelper.getStorageInfo();
  
  // Export data as JSON
  const exportData = () => {
    const dataStr = JSON.stringify(data);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `focus-timer-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  // Import data from file
  const importData = (event) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = e => {
      try {
        const parsedData = JSON.parse(e.target.result);
        
        // Validate imported data structure
        if (
          parsedData &&
          typeof parsedData === 'object' &&
          parsedData.sessions &&
          parsedData.achievements &&
          parsedData.analytics
        ) {
          dispatchData({ type: 'IMPORT_DATA', payload: parsedData });
          alert('Data imported successfully!');
        } else {
          alert('Invalid data format. Import failed.');
        }
      } catch (error) {
        console.error("Error parsing imported data:", error);
        alert('Error importing data. Please try again with a valid file.');
      }
    };
    fileReader.onerror = () => {
      alert('Error reading file. Please try again.');
    };
  };
  
  // Clear all data
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      dispatchData({ type: 'CLEAR_DATA' });
      return true;
    }
    return false;
  };
  
  return {
    exportData,
    importData,
    clearAllData,
    storageInfo
  };
};

export default DataManager;