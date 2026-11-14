
import React from 'react';
import { cn } from '../../utilis/formatters';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'emerald' | 'amber' | 'slate' | 'rose';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  className,
}) => {
  const styles = {
    purple: 'bg-violet-50 text-violet-700 border-violet-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
