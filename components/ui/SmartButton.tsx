// ✅ components/ui/SmartButton.tsx (Web3-Style Polished Button)
'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

interface SmartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const SmartButton = React.forwardRef<HTMLButtonElement, SmartButtonProps>(
  ({ loading, icon, variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <motion.button
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.02 }}
        ref={ref}
        disabled={loading || props.disabled}
        className={cn(
          'inline-flex items-center justify-center font-semibold rounded-xl transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50',
          variant === 'primary' &&
            'bg-blue-600 hover:bg-blue-700 text-white shadow-sm dark:bg-blue-500 dark:hover:bg-blue-400',
          variant === 'secondary' &&
            'bg-zinc-100 hover:bg-zinc-200 text-black dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600',
          variant === 'outline' &&
            'border border-zinc-400 dark:border-zinc-600 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700',
          size === 'sm' && 'px-3 py-1.5 text-sm',
          size === 'md' && 'px-4 py-2 text-base',
          size === 'lg' && 'px-5 py-3 text-lg',
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
          </>
        )}
      </motion.button>
    );
  }
);

SmartButton.displayName = 'SmartButton';
export default SmartButton;
