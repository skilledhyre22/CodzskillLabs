
import React from 'react';
import { cn } from '../../utilis/formatters';

interface StatCardProps {
  value: string | number;
  label: string;
  accent?: 'blue' | 'indigo' | 'amber' | 'violet' | 'emerald';
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  accent = 'violet',
}) => {
  const accentColors = {
    blue: 'text-blue-600 bg-gradient-to-br from-blue-50/70 to-white',
    indigo: 'text-indigo-600 bg-gradient-to-br from-indigo-50/70 to-white',
    amber: 'text-amber-600 bg-gradient-to-br from-amber-50/70 to-white',
    violet: 'text-violet-600 bg-gradient-to-br from-violet-50/70 to-white',
    emerald: 'text-emerald-600 bg-gradient-to-br from-emerald-50/70 to-white',
  };

  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200/80 p-5 shadow-sm',
        accentColors[accent]
      )}
    >
      <p className="text-2xl sm:text-3xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-600">{label}</p>
    </div>
  );
};
