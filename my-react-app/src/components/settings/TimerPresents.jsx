// C:\Users\cmaxx\Improved-timer\Improved-timer\my-react-app\src\components\settings\TimerPresets.jsx
import React, { useContext } from 'react';
import { Clock } from 'lucide-react';
import { SettingsContext } from '../context/SettingsContext';

const TimerPresets = () => {
  const { settings, dispatchSettings } = useContext(SettingsContext);
  
  const updatePreset = (presetName, key, value) => {
    // Validate input
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 1) {
      return;
    }
    
    // Apply reasonable limits
    const maxValue = key === 'work' ? 120 : 60; // 120min max work, 60min max break
    const safeValue = Math.min(numValue, maxValue);
    
    dispatchSettings({
      type: 'UPDATE_PRESET',
      payload: {
        name: presetName,
        values: {
          ...settings.presets[presetName],
          [key]: safeValue
        }
      }
    });
  };
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Timer Presets</h3>
      
      {Object.keys(settings.presets).map((preset) => (
        <div key={preset} className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <div className="font-medium">
              {preset.charAt(0).toUpperCase() + preset.slice(1)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-zinc-500 dark:text-zinc-400">
                Work (min)
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={settings.presets[preset].work}
                onChange={(e) => updatePreset(preset, 'work', e.target.value)}
                className="w-full p-2 border border-zinc-300 dark:border-zinc-700 rounded bg-zinc-50 dark:bg-zinc-800"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 dark:text-zinc-400">
                Break (min)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={settings.presets[preset].break}
                onChange={(e) => updatePreset(preset, 'break', e.target.value)}
                className="w-full p-2 border border-zinc-300 dark:border-zinc-700 rounded bg-zinc-50 dark:bg-zinc-800"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimerPresets;