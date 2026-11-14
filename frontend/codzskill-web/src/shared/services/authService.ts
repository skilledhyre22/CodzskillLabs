
import apiClient, { tokenStorage } from '../api/axiosInstance';
import { API_CONFIG } from '../api/apiEndPoints';
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../types';
import { PLATFORM_MEDIA } from '../../assets/index';

export const authService = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    if (!API_CONFIG.useMockData) {
      const { data } = await apiClient.post<AuthResponse>(
        API_CONFIG.endpoints.auth.login,
        payload
      );
      tokenStorage.set(data.token);
      return data;
    }

    await new Promise((res) => setTimeout(res, 450));
    const isTrainer =
      payload.email.toLowerCase().includes('trainer') ||
      payload.email.toLowerCase().includes('rahul');

    const mockUser: User = isTrainer
      ? {
          id: 'usr-trainer-1',
          fullName: 'Rahul Verma',
          email: payload.email,
          role: 'Trainer',
          avatarUrl: PLATFORM_MEDIA.rahulAvatar,
          headline: 'Principal .NET Architect',
        }
      : {
          id: 'usr-learner-1',
          fullName: 'Priya Sharma',
          email: payload.email,
          role: 'Learner',
          avatarUrl: PLATFORM_MEDIA.priyaAvatar,
          headline: 'Full-Stack Developer',
        };

    const response: AuthResponse = {
      token: 'mock.jwt.token.codzskill.labs',
      expiresAt: new Date(Date.now() + 86400 * 1000).toISOString(),
      user: mockUser,
    };

    tokenStorage.set(response.token);
    return response;
  },

  async register(payload: RegisterRequest): Promise<AuthResponse> {
    if (!API_CONFIG.useMockData) {
      const { data } = await apiClient.post<AuthResponse>(
        API_CONFIG.endpoints.auth.register,
        payload
      );
      tokenStorage.set(data.token);
      return data;
    }

    await new Promise((res) => setTimeout(res, 500));

    const response: AuthResponse = {
      token: 'mock.jwt.token.codzskill.labs',
      expiresAt: new Date(Date.now() + 86400 * 1000).toISOString(),
      user: {
        id: `usr-${Date.now()}`,
        fullName: payload.fullName,
        email: payload.email,
        role: payload.role,
        avatarUrl:
          payload.role === 'Trainer'
            ? PLATFORM_MEDIA.rahulAvatar
            : PLATFORM_MEDIA.priyaAvatar,
        headline: payload.expertise || 'CodzSkill Member',
      },
    };

    tokenStorage.set(response.token);
    return response;
  },

  logout(): void {
    tokenStorage.clear();
  },
};
