
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utilis/formatters';

interface LogoProps {
  theme?: 'dark' | 'light';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ theme = 'dark', className }) => {
  return (
    <Link to="/" className={cn('inline-flex items-center gap-2.5 select-none', className)}>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30 font-mono text-xs font-bold tracking-tighter">
        &lt;+&gt;
      </span>
      <span className="text-lg font-bold tracking-tight">
        <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>Codzskill</span>{' '}
        <span className={theme === 'dark' ? 'text-violet-300 font-medium' : 'text-violet-600 font-medium'}>
          Labs
        </span>
      </span>
    </Link>
  );
};
