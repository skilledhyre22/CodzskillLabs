
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Briefcase,
  Calendar,
  Award,
  FileText,
  FolderGit2,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Star,
  Users,
  Video,
  Wallet,
  BookOpen,
  X,
} from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { useAuth } from '../../app/providers/AuthProvider';
import { cn } from '../utilis/formatters';
import { PLATFORM_MEDIA } from '../../assets';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  to?: string;
}

interface DashboardLayoutProps {
  role: 'Learner' | 'Trainer';
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  pageTitle: string;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  role,
  activeSection,
  onSelectSection,
  pageTitle,
  searchQuery = '',
  onSearchChange,
  children,
}) => {
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const { user, switchDemoRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const learnerItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'learning', label: 'My Learning', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'live', label: 'Live Classes', icon: <Video className="h-4 w-4" />, to: '/live-class' },
    { id: 'bookings', label: 'Bookings (1:1)', icon: <Calendar className="h-4 w-4" /> },
    { id: 'assignments', label: 'Assignments', icon: <FileText className="h-4 w-4" /> },
    { id: 'projects', label: 'Projects & Labs', icon: <FolderGit2 className="h-4 w-4" /> },
    { id: 'certificates', label: 'Certificates', icon: <Award className="h-4 w-4" /> },
    { id: 'career', label: 'Career Hub', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
  ];

  const trainerItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'courses', label: 'My Courses', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'cohorts', label: 'Cohorts & Batches', icon: <Users className="h-4 w-4" /> },
    { id: 'sessions', label: '1:1 Sessions', icon: <Video className="h-4 w-4" />, to: '/live-class' },
    { id: 'learners', label: 'Learners', icon: <Users className="h-4 w-4" /> },
    { id: 'earnings', label: 'Earnings', icon: <Wallet className="h-4 w-4" /> },
    { id: 'reviews', label: 'Reviews', icon: <Star className="h-4 w-4" /> },
    { id: 'resources', label: 'Resources', icon: <FolderGit2 className="h-4 w-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
  ];

  const items = role === 'Learner' ? learnerItems : trainerItems;
  const displayName =
    user?.fullName || (role === 'Learner' ? 'Priya Sharma' : 'Rahul Verma');
  const avatar =
    user?.avatarUrl ||
    (role === 'Learner' ? PLATFORM_MEDIA.priyaAvatar : PLATFORM_MEDIA.rahulAvatar);

  const handleToggleRole = () => {
    const nextRole = role === 'Learner' ? 'Trainer' : 'Learner';
    switchDemoRole(nextRole);
    navigate(nextRole === 'Trainer' ? '/trainer/dashboard' : '/learner/dashboard');
  };

  const SidebarContent = (
    <div className="flex h-full flex-col bg-[#0D132B] text-slate-300">
      <div className="flex h-16 items-center justify-between px-5 border-b border-white/10">
        <Logo theme="dark" />
        <button
          onClick={() => setMobileSidebar(false)}
          className="lg:hidden text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {items.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.to && location.pathname !== item.to) {
                  navigate(item.to);
                } else {
                  onSelectSection(item.id);
                }
                setMobileSidebar(false);
              }}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/25'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3 space-y-2">
        <button
          onClick={handleToggleRole}
          className="w-full rounded-xl border border-violet-400/30 bg-violet-500/10 px-3 py-2 text-xs font-semibold text-violet-200 hover:bg-violet-500/20"
        >
          Switch to {role === 'Learner' ? 'Trainer' : 'Learner'} View
        </button>
        <div className="flex items-center justify-between px-2 pt-1">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
          >
            <Home className="h-3.5 w-3.5" /> Public Home
          </Link>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="inline-flex items-center gap-1 text-xs text-rose-300 hover:text-rose-200"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F5F7FB]">
      <aside className="hidden w-64 shrink-0 lg:block">{SidebarContent}</aside>

      {mobileSidebar && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-64">{SidebarContent}</div>
          <div
            className="flex-1 bg-slate-950/60"
            onClick={() => setMobileSidebar(false)}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebar(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link
              to="/"
              className="hidden sm:inline-flex items-center rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              title="Back to Home"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-lg font-bold text-slate-900 sm:hidden">{pageTitle}</h1>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Search courses, trainers, skills..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet-600" />
            </button>
            <div className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 py-1 pl-1.5 pr-3">
              <img
                src={avatar}
                alt={displayName}
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="hidden sm:inline text-sm font-medium text-slate-800">
                {displayName}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};
