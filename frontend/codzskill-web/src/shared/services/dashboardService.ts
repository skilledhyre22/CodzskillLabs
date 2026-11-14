
import apiClient from '../api/axiosInstance';
import { API_CONFIG } from '../api/apiEndPoints';
import type { Course, LearnerDashboardData, TrainerDashboardData } from '../types';
import { MOCK_LEARNER_DASHBOARD, MOCK_TRAINER_DASHBOARD } from './mockData';

export const dashboardService = {
  async getLearnerDashboard(): Promise<LearnerDashboardData> {
    if (!API_CONFIG.useMockData) {
      const { data } = await apiClient.get<LearnerDashboardData>(
        API_CONFIG.endpoints.dashboards.learner
      );
      return data;
    }

    await new Promise((res) => setTimeout(res, 250));
    return MOCK_LEARNER_DASHBOARD;
  },

  async getTrainerDashboard(): Promise<TrainerDashboardData> {
    if (!API_CONFIG.useMockData) {
      const { data } = await apiClient.get<TrainerDashboardData>(
        API_CONFIG.endpoints.dashboards.trainer
      );
      return data;
    }

    await new Promise((res) => setTimeout(res, 250));
    return MOCK_TRAINER_DASHBOARD;
  },

  async createTrainerCourse(newCourse: Partial<Course>): Promise<Course> {
    if (!API_CONFIG.useMockData) {
      const { data } = await apiClient.post<Course>(
        API_CONFIG.endpoints.courses.list,
        newCourse
      );
      return data;
    }

    await new Promise((res) => setTimeout(res, 350));

    return {
      id: `crs-${Date.now()}`,
      slug: (newCourse.title || 'new-course').toLowerCase().replace(/\s+/g, '-'),
      title: newCourse.title || 'Untitled Course',
      subtitle: newCourse.subtitle || 'Hands-on industry cohort program.',
      category: newCourse.category || 'Development',
      badgeText: 'Live Cohort',
      techTag: newCourse.techTag || '.NET',
      gradientClass: 'from-violet-600 via-purple-600 to-indigo-700',
      rating: 5.0,
      reviewCount: 1,
      durationWeeks: newCourse.durationWeeks || 6,
      priceInr: newCourse.priceInr || 12999,
      level: newCourse.level || 'Intermediate',
      trainerName: 'Rahul Verma',
      trainerTitle: 'Principal Architect',
      learnersCount: 0,
      status: 'Published',
    };
  },
};
