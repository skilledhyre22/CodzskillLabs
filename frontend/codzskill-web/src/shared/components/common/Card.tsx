
import React from 'react';
import { cn } from '../../utilis/formatters';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl border border-slate-200/80 bg-white shadow-sm',
        onClick && 'cursor-pointer transition hover:shadow-md hover:border-violet-200',
        className
      )}
    >
      {children}
    </div>
  );
};
