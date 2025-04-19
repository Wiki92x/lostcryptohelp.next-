// ✅ /app/settings/page.tsx — Settings Panel (Lightweight UI + Theme Sync)
'use client';

import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [themeMode, setThemeMode] = useState<'light' | 'dim' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode') as 'light' | 'dim' | 'dark';
    const savedAlerts = localStorage.getItem('alertsEnabled');
    if (savedTheme) {
      setThemeMode(savedTheme);
      setTheme(savedTheme);
    }
    if (savedAlerts) setAlertsEnabled(savedAlerts === 'true');
  }, [setTheme]);

  const handleThemeChange = (newTheme: 'light' | 'dim' | 'dark') => {
    setThemeMode(newTheme);
    setTheme(newTheme);
  };

  const saveSettings = () => {
    localStorage.setItem('themeMode', themeMode);
    localStorage.setItem('alertsEnabled', alertsEnabled.toString());
    alert('✅ Preferences saved.');
  };

  return (
    <div className="min-h-screen py-10 px-6 max-w-3xl mx-auto text-[var(--foreground)]">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">⚙️ App Settings</h1>

      <div className="space-y-6">
        <div className="flex items-center justify-between bg-zinc-800 p-4 rounded-xl shadow">
          <div>
            <p className="font-semibold text-lg">Enable Telegram Alerts</p>
            <p className="text-zinc-400 text-sm">Receive scan results in your Telegram inbox</p>
          </div>
          <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
        </div>

        <div className="bg-zinc-800 p-4 rounded-xl shadow">
          <p className="font-semibold text-lg mb-3">Theme Mode</p>
          <div className="flex gap-4">
            <Button variant={themeMode === 'light' ? 'default' : 'outline'} onClick={() => handleThemeChange('light')}>
              ☀️ Light
            </Button>
            <Button variant={themeMode === 'dim' ? 'default' : 'outline'} onClick={() => handleThemeChange('dim')}>
              🌗 Dim
            </Button>
            <Button variant={themeMode === 'dark' ? 'default' : 'outline'} onClick={() => handleThemeChange('dark')}>
              🌑 Dark
            </Button>
          </div>
        </div>

        <Button onClick={saveSettings} className="mt-4 bg-blue-600 hover:bg-blue-700">
          Save Preferences
        </Button>
      </div>
    </div>
  );
}