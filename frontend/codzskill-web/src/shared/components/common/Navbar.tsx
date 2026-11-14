
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../../../app/providers/AuthProvider';
import { cn } from '../../utilis/formatters';

interface NavbarProps {
  variant?: 'dark' | 'light';
}

export const Navbar: React.FC<NavbarProps> = ({ variant = 'dark' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/courses?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  };

  const isDark = variant === 'dark';

  const navItems = [
    { label: 'Learn', to: '/courses', hasDropdown: true },
    { label: 'Train', to: '/trainer/dashboard', hasDropdown: true },
    { label: 'For Business', to: '/corporate', hasDropdown: true },
    { label: 'Labs', to: '/live-class', hasDropdown: true },
    { label: 'Community', to: '/join', hasDropdown: false },
  ];

  const dashboardRoute =
    user?.role === 'Trainer' ? '/trainer/dashboard' : '/learner/dashboard';

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b backdrop-blur-md transition-colors',
        isDark
          ? 'border-white/10 bg-[#080D1F]/90 text-white'
          : 'border-slate-200 bg-white/95 text-slate-900'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo theme={isDark ? 'dark' : 'light'} />

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center gap-1 text-sm font-medium transition-colors',
                    isDark
                      ? isActive
                        ? 'text-violet-300'
                        : 'text-slate-300 hover:text-white'
                      : isActive
                        ? 'text-violet-700'
                        : 'text-slate-600 hover:text-slate-950'
                  )
                }
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="hidden sm:flex items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search .NET, React, AI..."
                className={cn(
                  'w-48 rounded-lg border px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500',
                  isDark
                    ? 'border-white/20 bg-white/10 text-white placeholder:text-slate-400'
                    : 'border-slate-300 bg-slate-50 text-slate-900'
                )}
                autoFocus
              />
            </form>
          ) : null}

           
          <button
            onClick={() => setSearchOpen((prev) => !prev)}
            className={cn(
              'rounded-lg p-2 transition-colors',
              isDark ? 'text-slate-300 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-slate-100'
            )}
            aria-label="Search courses"
          >
            <Search className="h-4 w-4" />
          </button>
            
             <Link
                to="/login"
                className={cn(
                  'hidden sm:inline-flex rounded-lg border px-4 py-1.5 text-sm font-medium transition-colors',
                  isDark
                    ? 'border-white/25 text-white hover:bg-white/10'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                )}
              >
                Login
              </Link>


          {isAuthenticated ? (
            <Link
              to={dashboardRoute}
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-violet-500 hover:to-indigo-500"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className={cn(
                  'hidden sm:inline-flex rounded-lg border px-4 py-1.5 text-sm font-medium transition-colors',
                  isDark
                    ? 'border-white/25 text-white hover:bg-white/10'
                    : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                )}
              >
                Login
              </Link>
              <Link
                to="/join"
                className="hidden sm:inline-flex rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-1.5 text-sm font-semibold text-white shadow-md shadow-violet-600/25 hover:from-violet-500 hover:to-indigo-500"
              >
                Get Started
              </Link>
            </>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className={cn(
            'border-t px-4 py-4 lg:hidden space-y-3',
            isDark ? 'border-white/10 bg-[#0A1026]' : 'border-slate-200 bg-white'
          )}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'block rounded-lg px-3 py-2 text-sm font-medium',
                isDark ? 'text-slate-200 hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="flex-1 rounded-lg border border-violet-400/40 px-3 py-2 text-center text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/join"
              onClick={() => setMobileOpen(false)}
              className="flex-1 rounded-lg bg-violet-600 px-3 py-2 text-center text-sm font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
