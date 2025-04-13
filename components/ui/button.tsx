'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    const variantStyles =
      variant === 'outline'
        ? 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground'
        : 'bg-primary text-white hover:bg-primary/90';

    return (
      <button
        className={cn(baseStyles, variantStyles, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
