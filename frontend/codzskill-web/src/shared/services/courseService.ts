
import apiClient from '../api/axiosInstance';
import { API_CONFIG } from '../api/apiEndPoints';
import type { CohortDetails, Course } from '../types';
import { MOCK_COHORT_DETAIL, MOCK_COURSES } from '../services/mockData';

export const courseService = {
  async getCourses(): Promise<Course[]> {
    if (!API_CONFIG.useMockData) {
      const { data } = await apiClient.get<Course[]>(API_CONFIG.endpoints.courses.list);
      return data;
    }

    await new Promise((res) => setTimeout(res, 250));
    return MOCK_COURSES;
  },

  async getCohortBySlug(slug: string): Promise<CohortDetails> {
    if (!API_CONFIG.useMockData) {
      const { data } = await apiClient.get<CohortDetails>(
        `${API_CONFIG.endpoints.courses.cohortBySlug}/${slug}`
      );
      return data;
    }

    await new Promise((res) => setTimeout(res, 250));
    const matched = MOCK_COURSES.find((c) => c.slug === slug);

    if (!matched) return MOCK_COHORT_DETAIL;

    return {
      ...MOCK_COHORT_DETAIL,
      ...matched,
      title: `${matched.title} – Live Cohort`,
    };
  },

  async enrollInCohort(cohortId: string): Promise<{ enrollmentId: string; message: string }> {
    if (!API_CONFIG.useMockData) {
      const { data } = await apiClient.post<{ enrollmentId: string; message: string }>(
        API_CONFIG.endpoints.courses.enroll,
        { cohortId }
      );
      return data;
    }

    await new Promise((res) => setTimeout(res, 400));

    return {
      enrollmentId: `ENR-${Math.floor(10000 + Math.random() * 90000)}`,
      message: 'Successfully enrolled! Your seat and live lab access are confirmed.',
    };
  },
};
