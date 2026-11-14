
import React, { createContext, useContext, useEffect, useState } from 'react';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '../../shared/types';
import { authService } from '../../shared/services/authService';
import { tokenStorage } from '../../shared/api/axiosInstance';
import { PLATFORM_MEDIA } from '../../assets';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (payload: LoginRequest) => Promise<AuthResponse>;
  register: (payload: RegisterRequest) => Promise<AuthResponse>;
  switchDemoRole: (role: 'Learner' | 'Trainer') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const USER_STORAGE_KEY = 'codzskill_user';

const DEFAULT_DEMO_LEARNER: User = {
  id: 'usr-learner-1',
  fullName: 'Priya Sharma',
  email: 'priya.sharma@codzskill.dev',
  role: 'Learner',
  avatarUrl: PLATFORM_MEDIA.priyaAvatar,
  headline: 'ASP.NET & React Learner',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved) as User;
      } catch {
        return DEFAULT_DEMO_LEARNER;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const login = async (payload: LoginRequest) => {
    const res = await authService.login(payload);
    setUser(res.user);
    return res;
  };

  const register = async (payload: RegisterRequest) => {
    const res = await authService.register(payload);
    setUser(res.user);
    return res;
  };

  const switchDemoRole = (role: 'Learner' | 'Trainer') => {
    tokenStorage.set('mock.jwt.token.codzskill.labs');
    if (role === 'Trainer') {
      setUser({
        id: 'usr-trainer-1',
        fullName: 'Rahul Verma',
        email: 'rahul.verma@codzskill.dev',
        role: 'Trainer',
        avatarUrl: PLATFORM_MEDIA.rahulAvatar,
        headline: 'Principal .NET Architect',
      });
    } else {
      setUser(DEFAULT_DEMO_LEARNER);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        register,
        switchDemoRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
