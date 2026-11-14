
import type {
  ChatMessage,
  CohortDetails,
  Course,
  LearnerDashboardData,
  TrainerDashboardData,
} from '../types';

export const MOCK_COURSES: Course[] = [
  {
    id: 'crs-dotnet-10',
    slug: 'aspnet-core-enterprise-development',
    title: 'ASP.NET Core 10 Enterprise Development',
    subtitle: 'Build scalable REST APIs, Clean Architecture, EF Core & microservices.',
    category: 'Development',
    badgeText: 'Live Cohort',
    techTag: '.NET',
    gradientClass: 'from-violet-600 via-purple-600 to-indigo-700',
    rating: 4.8,
    reviewCount: 1240,
    durationWeeks: 8,
    priceInr: 14999,
    level: 'Beginner to Advanced',
    trainerName: 'Rahul Verma',
    trainerTitle: 'Principal .NET Architect',
    learnersCount: 120,
    status: 'Published',
    progressPercent: 66,
  },
  {
    id: 'crs-react-adv',
    slug: 'reactjs-basics-to-advanced',
    title: 'React.js – From Basics to Advanced',
    subtitle: 'Master TypeScript, hooks, state management, Tailwind CSS & testing.',
    category: 'Development',
    badgeText: 'Live Cohort',
    techTag: 'React',
    gradientClass: 'from-cyan-700 via-teal-700 to-slate-900',
    rating: 4.7,
    reviewCount: 980,
    durationWeeks: 6,
    priceInr: 12999,
    level: 'Intermediate',
    trainerName: 'Ananya Nair',
    trainerTitle: 'Staff Frontend Engineer',
    learnersCount: 96,
    status: 'Published',
    progressPercent: 42,
  },
  {
    id: 'crs-genai-dev',
    slug: 'generative-ai-for-developers',
    title: 'Generative AI for Developers',
    subtitle: 'Build RAG pipelines, LLM agents, vector databases & Semantic Kernel apps.',
    category: 'AI & Data',
    badgeText: 'Live Cohort',
    techTag: 'AI',
    gradientClass: 'from-indigo-700 via-purple-700 to-fuchsia-800',
    rating: 4.8,
    reviewCount: 620,
    durationWeeks: 6,
    priceInr: 16999,
    level: 'Intermediate',
    trainerName: 'Dr. Vikram Sethi',
    trainerTitle: 'AI Solutions Lead',
    learnersCount: 64,
    status: 'Published',
  },
  {
    id: 'crs-azure-devops',
    slug: 'cloud-devops-azure-kubernetes',
    title: 'Azure Cloud & Kubernetes DevOps',
    subtitle: 'CI/CD pipelines, Docker, AKS, Terraform and observability at scale.',
    category: 'Cloud & DevOps',
    badgeText: 'Hands-on Lab',
    techTag: 'Cloud',
    gradientClass: 'from-blue-700 via-indigo-800 to-slate-900',
    rating: 4.9,
    reviewCount: 540,
    durationWeeks: 8,
    priceInr: 15999,
    level: 'Intermediate',
    trainerName: 'Karan Malhotra',
    trainerTitle: 'Cloud DevOps Architect',
    learnersCount: 82,
    status: 'Published',
  },
  {
    id: 'crs-product-mgmt',
    slug: 'tech-product-strategy-analytics',
    title: 'Product Management & Growth Analytics',
    subtitle: 'Roadmapping, SaaS metrics, stakeholder alignment and AI product strategy.',
    category: 'Business',
    badgeText: 'Cohort Program',
    techTag: 'PM',
    gradientClass: 'from-slate-800 via-purple-900 to-indigo-950',
    rating: 4.6,
    reviewCount: 410,
    durationWeeks: 5,
    priceInr: 11499,
    level: 'All Levels',
    trainerName: 'Meera Kapoor',
    trainerTitle: 'VP Product Strategy',
    learnersCount: 53,
    status: 'Published',
  },
  {
    id: 'crs-ui-ux-sys',
    slug: 'saas-design-systems-figma',
    title: 'SaaS UI/UX & Design Systems Mastery',
    subtitle: 'Design tokens, accessible component libraries, prototyping & handoff.',
    category: 'Design',
    badgeText: 'Live Cohort',
    techTag: 'UI/UX',
    gradientClass: 'from-fuchsia-700 via-purple-700 to-slate-900',
    rating: 4.8,
    reviewCount: 390,
    durationWeeks: 6,
    priceInr: 10999,
    level: 'Beginner to Pro',
    trainerName: 'Rohan Kulkarni',
    trainerTitle: 'Design Systems Lead',
    learnersCount: 74,
    status: 'Published',
  },
];

export const MOCK_COHORT_DETAIL: CohortDetails = {
  ...MOCK_COURSES[0],
  slug: 'aspnet-core-full-stack-cohort',
  title: 'ASP.NET Core Full Stack Development – Live Cohort',
  subtitle:
    'Build real-world, production-ready applications with ASP.NET Core, React and SQL Server.',
  durationWeeks: 12,
  priceInr: 19999,
  tags: ['Live Cohort', 'Beginner to Advanced', 'Project Based'],
  liveClassesPerWeek: 3,
  projectsCount: 2,
  certificateVerified: true,
  overview:
    'This intensive 12-week live cohort takes you from C# and ASP.NET Core Web API fundamentals to deploying full-stack enterprise systems with React, TypeScript, SQL Server, and Docker. Every week includes live code-alongs, architecture reviews, and mentor feedback.',
  curriculum: [
    {
      week: 'Weeks 1–3',
      title: 'ASP.NET Core 10 Web API & Clean Architecture',
      topics: [
        'Minimal APIs vs Controller-based REST services',
        'Dependency Injection, Middleware & Global Exception Handling',
        'Entity Framework Core 10, LINQ optimization & SQL Server migrations',
      ],
    },
    {
      week: 'Weeks 4–6',
      title: 'Security, Auth & Microservice Patterns',
      topics: [
        'JWT Bearer Authentication, Refresh Tokens & Role-Based Policies',
        'Redis Caching, Background Workers & Serilog Observability',
        'Automated Integration Testing with xUnit & WebApplicationFactory',
      ],
    },
    {
      week: 'Weeks 7–9',
      title: 'React + TypeScript Frontend Integration',
      topics: [
        'Component Architecture, Custom Hooks & React Router',
        'Axios Interceptors, Optimistic UI & Tailwind Design Systems',
        'Real-time updates with SignalR',
      ],
    },
    {
      week: 'Weeks 10–12',
      title: 'Capstone Deployment & Career Readiness',
      topics: [
        'Dockerizing .NET APIs + React SPA with GitHub Actions CI/CD',
        'Azure App Service & SQL Cloud Deployment',
        'Mock System Design Interviews & Portfolio Review',
      ],
    },
  ],
  projects: [
    {
      title: 'Enterprise EdTech & Cohort Marketplace',
      description:
        'Multi-role platform supporting learner enrollments, trainer payouts, and SignalR live class chat.',
      stack: ['ASP.NET Core 10', 'React', 'TypeScript', 'SQL Server'],
    },
    {
      title: 'Distributed Order & Inventory Microservice',
      description:
        'Event-driven backend using Clean Architecture, Redis caching, and automated Docker deployment.',
      stack: ['EF Core', 'JWT Auth', 'Docker', 'GitHub Actions'],
    },
  ],
  schedule: [
    { day: 'Tuesday', time: '7:30 PM – 9:30 PM IST', sessionType: 'Live Architecture & Coding' },
    { day: 'Thursday', time: '7:30 PM – 9:30 PM IST', sessionType: 'Hands-on Feature Build' },
    { day: 'Saturday', time: '11:00 AM – 1:00 PM IST', sessionType: 'Project Lab & Code Review' },
  ],
  faqs: [
    {
      question: 'Are live sessions recorded if I miss a class?',
      answer:
        'Yes. HD recordings, repository commits, and lab guides are published within 2 hours of each live session.',
    },
    {
      question: 'What prerequisites do I need?',
      answer:
        'Basic familiarity with any programming language and OOP concepts. We cover C# and TypeScript foundations in Week 1.',
    },
    {
      question: 'Is the certificate verified?',
      answer:
        'Yes, every graduate receives a verifiable CodzSkill Labs credential link upon completing both capstone projects.',
    },
  ],
};

export const MOCK_LEARNER_DASHBOARD: LearnerDashboardData = {
  activeCoursesCount: 3,
  liveSessionsCount: 12,
  assignmentsDueCount: 4,
  certificatesCount: 2,
  continueLearning: [
    {
      ...MOCK_COURSES[0],
      title: 'ASP.NET Core 10: Building Enterprise Applications',
      progressPercent: 66,
    },
    {
      ...MOCK_COURSES[1],
      progressPercent: 42,
    },
  ],
  upcomingSessions: [
    {
      id: 'sess-1',
      title: 'ASP.NET Core – Live Session',
      scheduleText: 'Today, 7:00 PM',
      courseId: 'crs-dotnet-10',
      isLiveNow: true,
    },
    {
      id: 'sess-2',
      title: 'Project Lab – Team Review',
      scheduleText: 'Tomorrow, 6:30 PM',
      courseId: 'crs-dotnet-10',
    },
  ],
  assignments: [
    {
      id: 'asg-1',
      title: 'Implement ProductController & DI Repository',
      courseTitle: 'ASP.NET Core 10 Enterprise Development',
      dueDate: 'Tomorrow, 11:59 PM',
      status: 'Pending',
    },
    {
      id: 'asg-2',
      title: 'JWT Refresh Token Middleware Lab',
      courseTitle: 'ASP.NET Core 10 Enterprise Development',
      dueDate: 'In 4 days',
      status: 'Pending',
    },
    {
      id: 'asg-3',
      title: 'Accessible Dashboard Modal Component',
      courseTitle: 'React.js – From Basics to Advanced',
      dueDate: 'Submitted',
      status: 'Graded',
    },
  ],
  certificates: [
    {
      id: 'cert-1',
      title: 'C# & Object-Oriented Architecture Foundations',
      issuedDate: 'Oct 2026',
      credentialCode: 'CSL-2026-DOTNET-9041',
    },
    {
      id: 'cert-2',
      title: 'Modern TypeScript & Tailwind CSS Systems',
      issuedDate: 'Aug 2026',
      credentialCode: 'CSL-2026-FE-4418',
    },
  ],
};

export const MOCK_TRAINER_DASHBOARD: TrainerDashboardData = {
  publishedCoursesCount: 6,
  activeCohortsCount: 3,
  oneOnOneSessionsCount: 18,
  totalEarningsInr: 124500,
  courses: MOCK_COURSES.slice(0, 3),
  learners: [
    {
      id: 'lrn-1',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      cohort: 'ASP.NET Core 10 Cohort',
      progress: 66,
    },
    {
      id: 'lrn-2',
      name: 'Amit Patel',
      email: 'amit.patel@example.com',
      cohort: 'ASP.NET Core 10 Cohort',
      progress: 78,
    },
    {
      id: 'lrn-3',
      name: 'Sneha Reddy',
      email: 'sneha.reddy@example.com',
      cohort: 'React.js Advanced',
      progress: 54,
    },
  ],
};

export const INITIAL_LIVE_CHAT: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'Priya',
    role: 'Learner',
    time: '7:13 PM',
    text: 'Can you explain the routing attributes again?',
  },
  {
    id: 'm2',
    sender: 'Amit',
    role: 'Learner',
    time: '7:14 PM',
    text: 'Yes, a quick example will help.',
  },
  {
    id: 'm3',
    sender: 'Trainer',
    role: 'Trainer',
    time: '7:15 PM',
    text: "Sure, I'll show that now in the code.",
  },
];

export const INITIAL_LIVE_CODE = `namespace Codzskill.Labs.Demo;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _service;

    public ProductController(IProductService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _service.GetAllAsync();
        return Ok(products);
    }
}`;
