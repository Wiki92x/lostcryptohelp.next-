// ✅ components/ThemeSwitcher.tsx — Modern 3-Mode Toggle (Light, Dim, Dark)
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

const modes = ['light', 'dim', 'dark'];

export default function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const next = () => {
    const i = modes.indexOf(currentTheme as string);
    setTheme(modes[(i + 1) % modes.length]);
  };

  const icon = {
    light: <Sun className="w-5 h-5 text-yellow-400" />,
    dim: <Circle className="w-5 h-5 text-blue-400" />,
    dark: <Moon className="w-5 h-5 text-zinc-300" />
  }[currentTheme as string || 'dark'];

  return (
    <motion.button
      onClick={next}
      whileTap={{ scale: 0.9 }}
      aria-label="Switch Theme"
      className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 shadow-lg transition-all"
    >
      {icon}
    </motion.button>
  );
}
