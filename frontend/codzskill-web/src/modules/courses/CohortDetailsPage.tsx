
import React, { useCallback, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FolderGit2,
  Video,
} from 'lucide-react';
import { useAsync } from '../../shared/hooks/useAsync';
import { courseService } from '../../shared/services/courseService';
import { Badge } from '../../shared/components/common/Badge';
import { Button } from '../../shared/components/common/Button';
import { Card } from '../../shared/components/common/Card';
import { cn, formatInr } from '../../shared/utilis/formatters';
import { PLATFORM_MEDIA } from '../../assets';

type TabKey = 'Overview' | 'Curriculum' | 'Projects' | 'Trainer' | 'Schedule' | 'FAQs';

export const CohortDetailsPage: React.FC = () => {
  const { slug = 'aspnet-core-full-stack-cohort' } = useParams();
  const [activeTab, setActiveTab] = useState<TabKey>('Overview');
  const [enrolling, setEnrolling] = useState(false);
  const [enrolledMsg, setEnrolledMsg] = useState<string | null>(null);

  const fetchCohort = useCallback(() => courseService.getCohortBySlug(slug), [slug]);
  const { data: cohort, loading, error } = useAsync(fetchCohort);

  const handleEnroll = async () => {
    if (!cohort) return;
    setEnrolling(true);
    try {
      const res = await courseService.enrollInCohort(cohort.id);
      setEnrolledMsg(`${res.message} (Ref: ${res.enrollmentId})`);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-sm text-slate-500">
        Loading cohort details...
      </div>
    );
  }

  if (error || !cohort) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-sm text-rose-600">
        {error || 'Cohort not found.'}
      </div>
    );
  }

  const tabs: TabKey[] = ['Overview', 'Curriculum', 'Projects', 'Trainer', 'Schedule', 'FAQs'];

  return (
    <div className="bg-slate-50 pb-16">
      {/* Top Hero Card */}
      <section className="border-b border-slate-200 bg-gradient-to-br from-white via-violet-50/40 to-indigo-50/60 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb */}
          <nav className="text-xs text-slate-500">
            <Link to="/" className="hover:text-violet-600">Home</Link>
            <span className="mx-2">&gt;</span>
            <Link to="/courses" className="hover:text-violet-600">Cohorts</Link>
            <span className="mx-2">&gt;</span>
            <span className="font-medium text-slate-800">{cohort.title}</span>
          </nav>

          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-4">
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {cohort.title}
              </h1>
              <p className="text-base text-slate-600">{cohort.subtitle}</p>

              <div className="flex flex-wrap gap-2 pt-1">
                {cohort.tags.map((tag, idx) => (
                  <Badge
                    key={tag}
                    variant={idx === 0 ? 'rose' : idx === 1 ? 'emerald' : 'purple'}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Right Laptop / Stack Graphic */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[#0D132B] p-6 text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-violet-600 px-3 py-1 font-mono text-xs font-bold">
                    .NET 10
                  </span>
                  <span className="rounded-lg bg-cyan-500/20 px-3 py-1 font-mono text-xs font-bold text-cyan-300">
                    React + TS
                  </span>
                  <span className="rounded-lg bg-fuchsia-500/20 px-3 py-1 font-mono text-xs font-bold text-fuchsia-300">
                    SQL Server
                  </span>
                </div>
                <pre className="mt-5 overflow-x-auto rounded-xl bg-black/40 p-4 font-mono text-xs text-violet-200">
{`builder.Services.AddCodzSkillLabs();
app.MapCohortHub("/live");
app.Run();`}
                </pre>
              </div>
            </div>
          </div>

          {/* Metrics & Pricing Bar matching reference */}
          <Card className="p-5">
            <div className="grid items-center gap-6 lg:grid-cols-12">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:col-span-8">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-violet-600 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500">Duration</p>
                    <p className="text-sm font-bold text-slate-900">
                      {cohort.durationWeeks} Weeks
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-violet-600 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500">Live Classes</p>
                    <p className="text-sm font-bold text-slate-900">
                      {cohort.liveClassesPerWeek} per week
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FolderGit2 className="h-5 w-5 text-violet-600 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500">Project</p>
                    <p className="text-sm font-bold text-slate-900">
                      {cohort.projectsCount} Real Projects
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-violet-600 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500">Certificate</p>
                    <p className="text-sm font-bold text-slate-900">Verified</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center justify-between gap-4 border-t pt-4 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">
                    {formatInr(cohort.priceInr)}
                  </p>
                  <p className="text-[11px] text-slate-500">Inclusive of labs &amp; certificate</p>
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <Button onClick={handleEnroll} loading={enrolling}>
                    Enroll Now
                  </Button>
                  <button
                    onClick={() =>
                      alert('Brochure PDF downloaded for ' + cohort.title)
                    }
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <Download className="h-3.5 w-3.5" /> Download Brochure
                  </button>
                </div>
              </div>
            </div>

            {enrolledMsg && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {enrolledMsg}
              </div>
            )}
          </Card>

          {/* Tabs */}
          <div className="flex gap-6 overflow-x-auto border-b border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'whitespace-nowrap pb-3 text-sm font-semibold transition-colors',
                  activeTab === tab
                    ? 'border-b-2 border-violet-600 text-violet-700'
                    : 'text-slate-500 hover:text-slate-900'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {activeTab === 'Overview' && (
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Program Overview</h2>
            <p className="text-sm leading-relaxed text-slate-600">{cohort.overview}</p>
            <div className="grid gap-4 pt-2 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-bold text-slate-900">Live Mentor Code Reviews</p>
                <p className="mt-1 text-xs text-slate-600">
                  Weekly architecture feedback directly on your GitHub pull requests.
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-bold text-slate-900">Cloud Sandbox Included</p>
                <p className="mt-1 text-xs text-slate-600">
                  Run .NET 10, SQL Server, and Docker labs straight from your workspace.
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-bold text-slate-900">Career &amp; Mock Interviews</p>
                <p className="mt-1 text-xs text-slate-600">
                  1:1 system design and full-stack interview preparation.
                </p>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'Curriculum' && (
          <div className="space-y-4">
            {cohort.curriculum.map((mod) => (
              <Card key={mod.week} className="p-5">
                <p className="text-xs font-bold uppercase text-violet-600">{mod.week}</p>
                <h3 className="mt-1 text-lg font-bold text-slate-900">{mod.title}</h3>
                <ul className="mt-3 space-y-2">
                  {mod.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500 shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'Projects' && (
          <div className="grid gap-6 md:grid-cols-2">
            {cohort.projects.map((proj) => (
              <Card key={proj.title} className="p-6">
                <h3 className="text-lg font-bold text-slate-900">{proj.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{proj.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {proj.stack.map((tech) => (
                    <Badge key={tech} variant="purple">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'Trainer' && (
          <Card className="flex flex-col sm:flex-row items-center gap-6 p-6">
            <img
              src={PLATFORM_MEDIA.rahulAvatar}
              alt={cohort.trainerName}
              className="h-24 w-24 rounded-2xl object-cover"
            />
            <div>
              <h3 className="text-xl font-bold text-slate-900">{cohort.trainerName}</h3>
              <p className="text-sm font-medium text-violet-600">{cohort.trainerTitle}</p>
              <p className="mt-2 text-sm text-slate-600">
                12+ years building distributed enterprise systems on .NET, Azure, and React. Mentored over 8,000+ engineers globally.
              </p>
            </div>
          </Card>
        )}

        {activeTab === 'Schedule' && (
          <Card className="divide-y divide-slate-100">
            {cohort.schedule.map((slot) => (
              <div key={slot.day} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-violet-600" />
                  <div>
                    <p className="font-bold text-slate-900">{slot.day}</p>
                    <p className="text-xs text-slate-500">{slot.sessionType}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-700">{slot.time}</span>
              </div>
            ))}
          </Card>
        )}

        {activeTab === 'FAQs' && (
          <div className="space-y-3">
            {cohort.faqs.map((faq) => (
              <Card key={faq.question} className="p-5">
                <h4 className="font-bold text-slate-900">{faq.question}</h4>
                <p className="mt-1.5 text-sm text-slate-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
