export type UserRole = 'Learner' | 'Trainer' | 'CorporateAdmin';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  headline?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  expiresAt: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: 'Learner' | 'Trainer';
  expertise?: string;
  experienceYears?: number;
}

export type CourseCategory =
  | 'All'
  | 'Development'
  | 'AI & Data'
  | 'Cloud & DevOps'
  | 'Business'
  | 'Design';

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: Exclude<CourseCategory, 'All'>;
  badgeText: string;
  techTag: string;
  gradientClass: string;
  rating: number;
  reviewCount: number;
  durationWeeks: number;
  priceInr: number;
  level: string;
  trainerName: string;
  trainerTitle: string;
  learnersCount: number;
  status?: 'Published' | 'Draft';
  progressPercent?: number;
}

export interface CohortCurriculumModule {
  week: string;
  title: string;
  topics: string[];
}

export interface CohortDetails extends Course {
  tags: string[];
  liveClassesPerWeek: number;
  projectsCount: number;
  certificateVerified: boolean;
  overview: string;
  curriculum: CohortCurriculumModule[];
  projects: { title: string; description: string; stack: string[] }[];
  schedule: { day: string; time: string; sessionType: string }[];
  faqs: { question: string; answer: string }[];
}

export interface LiveSessionItem {
  id: string;
  title: string;
  scheduleText: string;
  courseId: string;
  isLiveNow?: boolean;
}

export interface AssignmentItem {
  id: string;
  title: string;
  courseTitle: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Graded';
}

export interface CertificateItem {
  id: string;
  title: string;
  issuedDate: string;
  credentialCode: string;
}

export interface LearnerDashboardData {
  activeCoursesCount: number;
  liveSessionsCount: number;
  assignmentsDueCount: number;
  certificatesCount: number;
  continueLearning: Course[];
  upcomingSessions: LiveSessionItem[];
  assignments: AssignmentItem[];
  certificates: CertificateItem[];
}

export interface TrainerLearnerSummary {
  id: string;
  name: string;
  email: string;
  cohort: string;
  progress: number;
}

export interface TrainerDashboardData {
  publishedCoursesCount: number;
  activeCohortsCount: number;
  oneOnOneSessionsCount: number;
  totalEarningsInr: number;
  courses: Course[];
  learners: TrainerLearnerSummary[];
}

export interface CorporateProposalRequest {
  companyName: string;
  contactName: string;
  workEmail: string;
  teamSize: string;
  focusArea: string;
  deliveryMode: 'Online' | 'On-site' | 'Hybrid';
  notes: string;
}

export interface CorporateProposalResponse {
  referenceId: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  role?: 'Trainer' | 'Learner';
  time: string;
  text: string;
}