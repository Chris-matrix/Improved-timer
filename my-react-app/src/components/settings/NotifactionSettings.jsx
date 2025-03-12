// C:\Users\cmaxx\Improved-timer\Improved-timer\my-react-app\src\components\settings\NotificationSettings.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Bell, Volume2 } from 'lucide-react';
import { SettingsContext } from '../context/SettingsContext';

const NotificationSettings = () => {
  const { settings, dispatchSettings } = useContext(SettingsContext);
  const [notificationPermission, setNotificationPermission] = useState('default');
  
  // Check notification permission on mount
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);
  
  // Toggle notifications
  const toggleNotifications = async () => {
    // If toggling on and permission not granted yet, request it
    if (!settings.notifications && notificationPermission !== 'granted') {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        
        // Only enable if permission granted
        if (permission === 'granted') {
          dispatchSettings({ type: 'UPDATE_NOTIFICATIONS', payload: true });
        }
      }
    } else {
      // Toggle the current state
      dispatchSettings({ type: 'UPDATE_NOTIFICATIONS', payload: !settings.notifications });
    }
  };
  
  // Toggle sounds
  const toggleSounds = () => {
    dispatchSettings({ 
      type: 'UPDATE_SOUNDS', 
      payload: { enabled: !settings.sounds.enabled }
    });
  };
  
  // Update volume
  const updateVolume = (e) => {
    dispatchSettings({
      type: 'UPDATE_SOUNDS',
      payload: { volume: parseFloat(e.target.value) }
    });
  };
  
  // Test notification
  const testNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Focus Timer', {
        body: 'This is a test notification!',
        icon: '/timer-icon.png'
      });
    }
  };
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Notifications & Sound</h3>
      
      {/* Browser notifications */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox"
              checked={settings.notifications}
              onChange={toggleNotifications}
              className="w-4 h-4"
            />
            <span>Browser notifications</span>
          </label>
          
          {settings.notifications && notificationPermission === 'granted' && (
            <button
              onClick={testNotification}
              className="text-xs text-blue-600 dark:text-blue-400"
            >
              Test
            </button>
          )}
        </div>
        
        {notificationPermission === 'denied' && (
          <div className="text-xs text-red-500 mt-1">
            Notification permission denied. Please enable notifications in your browser settings.
          </div>
        )}
      </div>
      
      {/* Sound settings */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox"
            checked={settings.sounds.enabled}
            onChange={toggleSounds}
            className="w-4 h-4"
          />
          <span>Enable sounds</span>
        </label>
        
        <div className="flex items-center gap-2">
          <Volume2 size={16} className={settings.sounds.enabled ? '' : 'text-zinc-400'} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.sounds.volume}
            onChange={updateVolume}
            className="w-full"
            disabled={!settings.sounds.enabled}
          />
          <div className="text-xs w-8">
            {Math.round(settings.sounds.volume * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;