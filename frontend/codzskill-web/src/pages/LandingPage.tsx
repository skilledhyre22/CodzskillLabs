
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Brain,
  Cloud,
  Code2,
  Cpu,
  FlaskConical,
  Layers,
  Palette,
  TrendingUp,
  UserCheck,
  Users,
  Video,
} from 'lucide-react';
import { CourseCard } from '../../src/shared/components/common/CourseCard';
import { MOCK_COURSES } from '../../src/shared/services/mockData';
import { PLATFORM_MEDIA } from '../assets/index';

export const LandingPage: React.FC = () => {
  const highlights = [
    { icon: <UserCheck className="h-4 w-4 text-cyan-400" />, label: 'One-to-One Training' },
    { icon: <Users className="h-4 w-4 text-violet-400" />, label: 'Cohort Programs' },
    { icon: <Video className="h-4 w-4 text-fuchsia-400" />, label: 'Live Classes' },
    { icon: <FlaskConical className="h-4 w-4 text-indigo-400" />, label: 'Hands-on Labs' },
    { icon: <Award className="h-4 w-4 text-amber-400" />, label: 'Certifications & Career Support' },
  ];

  const stats = [
    { value: '50K+', label: 'Learners' },
    { value: '2K+', label: 'Trainers' },
    { value: '500+', label: 'Live Cohorts' },
    { value: '100+', label: 'Corporate Clients' },
  ];

  const categories = [
    { name: 'Development', count: '140+ Courses', icon: <Code2 className="h-5 w-5 text-violet-600" /> },
    { name: 'AI & Data', count: '85+ Courses', icon: <Brain className="h-5 w-5 text-indigo-600" /> },
    { name: 'Cloud & DevOps', count: '60+ Courses', icon: <Cloud className="h-5 w-5 text-sky-600" /> },
    { name: 'Business', count: '45+ Courses', icon: <TrendingUp className="h-5 w-5 text-emerald-600" /> },
    { name: 'Design', count: '38+ Courses', icon: <Palette className="h-5 w-5 text-fuchsia-600" /> },
    { name: 'Architecture', count: '52+ Courses', icon: <Layers className="h-5 w-5 text-amber-600" /> },
  ];

  return (
    <div>
      {/* Hero Section matching CodzSkill Labs reference */}
      <section className="hero-mesh relative overflow-hidden text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">
                CODZSKILL LABS
              </p>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[52px] lg:leading-[1.12]">
                Learn, Build, Practice <br className="hidden sm:block" />
                and Grow Your Career
              </h1>

              <p className="max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed">
                A global learning and trainer marketplace for technology, professional and industry skills.
              </p>

              {/* 5 Feature Pills */}
              <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-5">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 px-2.5 py-3 text-center backdrop-blur-sm"
                  >
                    <div className="mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-medium leading-tight text-slate-200">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 hover:from-violet-500 hover:to-indigo-500 transition-all"
                >
                  Explore Courses <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/register/trainer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
                >
                  Join as a Trainer
                </Link>
              </div>

              {/* Platform Statistics */}
              <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-7 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                    <p className="text-xs font-medium text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Column with Floating Tech Badges */}
            <div className="relative lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-violet-600/30 to-indigo-500/20 blur-2xl" />
                <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-navy-800/80 shadow-2xl">
                  <img
                    src={PLATFORM_MEDIA.heroStudent}
                    alt="CodzSkill Labs Learner"
                    className="h-[380px] w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B19] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/15 bg-slate-900/85 p-3.5 backdrop-blur-md flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 font-mono text-xs font-bold">
                        &lt;+&gt;
                      </span>
                      <div>
                        <p className="text-xs font-bold text-white">Codzskill Labs IDE</p>
                        <p className="text-[11px] text-violet-300">Live ASP.NET & React Sandbox</p>
                      </div>
                    </div>
                    <Link
                      to="/live-class"
                      className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500"
                    >
                      Try Live
                    </Link>
                  </div>
                </div>

                {/* Floating Skill Pills */}
                <div className="hidden sm:flex items-center gap-2 rounded-xl border border-white/15 bg-slate-900/90 px-3.5 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md absolute -left-8 top-8">
                  <Code2 className="h-4 w-4 text-violet-400" />
                  ASP.NET Core
                </div>
                <div className="hidden sm:flex items-center gap-2 rounded-xl border border-white/15 bg-slate-900/90 px-3.5 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md absolute -left-10 top-24">
                  <Cpu className="h-4 w-4 text-cyan-400" />
                  React
                </div>
                <div className="hidden sm:flex items-center gap-2 rounded-xl border border-white/15 bg-slate-900/90 px-3.5 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md absolute -left-8 top-40">
                  <Brain className="h-4 w-4 text-fuchsia-400" />
                  AI / ML
                </div>
                <div className="hidden sm:flex items-center gap-2 rounded-xl border border-white/15 bg-slate-900/90 px-3.5 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md absolute -left-12 top-56">
                  <Cloud className="h-4 w-4 text-sky-400" />
                  Cloud &amp; DevOps
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Categories */}
      <section className="bg-white py-14 border-b border-slate-200/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
                Learning Categories
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                Master In-Demand Technology Domains
              </h2>
            </div>
            <Link
              to="/courses"
              className="text-sm font-semibold text-violet-600 hover:text-violet-700"
            >
              Browse All Categories &rarr;
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/courses?category=${encodeURIComponent(cat.name)}`}
                className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition-all hover:border-violet-300 hover:bg-white hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm group-hover:bg-violet-50">
                  {cat.icon}
                </div>
                <h3 className="mt-3 text-sm font-bold text-slate-900">{cat.name}</h3>
                <p className="mt-0.5 text-xs text-slate-500">{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
                Featured Live Cohorts
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                Learn with Industry Practitioners
              </h2>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              View All Courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_COURSES.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Role & Corporate Banner */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-gradient-to-br from-navy-900 to-violet-950 p-8 text-white shadow-xl">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-violet-200">
                For Individuals &amp; Trainers
              </span>
              <h3 className="mt-4 text-2xl font-bold">
                Experience Interactive Dashboards &amp; Live IDE Classes
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Jump straight into the Learner Portal, Trainer Analytics, or our Real-time ASP.NET Core Live Classroom.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/learner/dashboard"
                  className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
                >
                  Learner Dashboard
                </Link>
                <Link
                  to="/trainer/dashboard"
                  className="rounded-xl border border-white/25 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Trainer Dashboard
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-8">
              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                For Enterprises
              </span>
              <h3 className="mt-4 text-2xl font-bold text-slate-900">
                Corporate Upskilling Tailored to Your Stack
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Custom .NET, Cloud, and GenAI bootcamps delivered online, on-site, or hybrid with measurable skill assessments.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/corporate"
                  className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Explore Corporate Training &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
