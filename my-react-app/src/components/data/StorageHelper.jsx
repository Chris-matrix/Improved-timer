// C:\Users\cmaxx\Improved-timer\Improved-timer\my-react-app\src\components\data\StorageHelper.jsx

// Helper functions for storage operations
export const StorageHelper = {
    // Check if localStorage is available
    isAvailable: () => {
      try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    },
  
    // Save data to localStorage
    saveData: (key, data) => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
      } catch (e) {
        console.error('Error saving to localStorage:', e);
        return false;
      }
    },
  
    // Load data from localStorage
    loadData: (key, defaultValue = null) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        console.error('Error loading from localStorage:', e);
        return defaultValue;
      }
    },
  
    // Clear all application data
    clearAll: () => {
      try {
        localStorage.removeItem('focusTimer.settings');
        localStorage.removeItem('focusTimer.data');
        return true;
      } catch (e) {
        console.error('Error clearing localStorage:', e);
        return false;
      }
    },
  
    // Get storage usage information
    getStorageInfo: () => {
      if (!StorageHelper.isAvailable()) {
        return { available: false };
      }
  
      try {
        let totalSize = 0;
        let appSize = 0;
        
        // Calculate total localStorage size
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const value = localStorage.getItem(key);
          const size = (key.length + value.length) * 2; // UTF-16 uses 2 bytes per character
          totalSize += size;
          
          // Calculate app specific size
          if (key.startsWith('focusTimer.')) {
            appSize += size;
          }
        }
        
        return {
          available: true,
          total: totalSize,
          app: appSize,
          // Estimated limit is around 5MB for most browsers
          percentUsed: (totalSize / (5 * 1024 * 1024)) * 100
        };
      } catch (e) {
        console.error('Error calculating storage usage:', e);
        return { available: false, error: e.message };
      }
    }
  };