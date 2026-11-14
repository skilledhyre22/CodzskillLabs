
/**
 * Central endpoint configuration for ASP.NET Core Web API integration.
 */
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7001/api',

  useMockData: (import.meta.env.VITE_USE_MOCK_DATA ?? 'true') === 'true',

  endpoints: {
    auth: {
      login: import.meta.env.VITE_EP_LOGIN || '/auth/login',
      register: import.meta.env.VITE_EP_REGISTER || '/auth/register',
      me: import.meta.env.VITE_EP_ME || '/auth/me',
    },
    courses: {
      list: import.meta.env.VITE_EP_COURSES || '/courses',
      cohortBySlug: import.meta.env.VITE_EP_COHORT || '/cohorts',
      enroll: import.meta.env.VITE_EP_ENROLL || '/enrollments',
    },
    dashboards: {
      learner: import.meta.env.VITE_EP_LEARNER_DASH || '/learner/dashboard',
      trainer: import.meta.env.VITE_EP_TRAINER_DASH || '/trainer/dashboard',
    },
    corporate: {
      proposal: import.meta.env.VITE_EP_CORPORATE_PROPOSAL || '/corporate/proposals',
    },
  },
};
