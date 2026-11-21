
// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';

// import type {
//   AuthResponse,
//   LoginRequest,
//   RegisterRequest,
//   User,
// } from '../../shared/types';

// import { authService } from '../../shared/services/authService';
// import { tokenStorage } from '../../shared/api/axiosInstance';

// interface AuthContextValue {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (payload: LoginRequest) => Promise<AuthResponse>;
//   register: (payload: RegisterRequest) => Promise<AuthResponse>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// const USER_STORAGE_KEY = 'codzskill_user';

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>(() => {
//     const saved = localStorage.getItem(USER_STORAGE_KEY);

//     if (saved) {
//       try {
//         return JSON.parse(saved) as User;
//       } catch {
//         localStorage.removeItem(USER_STORAGE_KEY);
//       }
//     }

//     return null;
//   });

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
//     } else {
//       localStorage.removeItem(USER_STORAGE_KEY);
//     }
//   }, [user]);

//   const login = async (payload: LoginRequest) => {
//     const res = await authService.login(payload);
//     setUser(res.user);
//     return res;
//   };

//   const register = async (payload: RegisterRequest) => {
//     const res = await authService.register(payload);
//     setUser(res.user);
//     return res;
//   };

//   const logout = () => {
//     authService.logout();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: Boolean(user),
//         login,
//         register,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export function useAuth(): AuthContextValue {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error('useAuth must be used inside AuthProvider');
//   }

//   return context;
// }
