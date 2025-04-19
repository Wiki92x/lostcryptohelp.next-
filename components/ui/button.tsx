// ✅ components/ui/button.tsx — Enhanced Web3 Button Component (Glowing + Theme Reactive)

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        ghost: 'bg-transparent hover:bg-zinc-800 border border-zinc-700 text-white',
        outline: 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
        gradient: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:brightness-110',
        glass: 'bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20',
      },
      size: {
        default: 'h-10 px-6',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10 p-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
);

Button.displayName = 'Button';

export { Button, buttonVariants };