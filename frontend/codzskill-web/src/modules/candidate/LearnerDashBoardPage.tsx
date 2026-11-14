
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Calendar, CheckCircle2, FileText, Laptop } from 'lucide-react';
import { DashboardLayout } from '../../shared/layouts/DashboardLayout';
import { StatCard } from '../../shared/components/common/StatCard';
import { Card } from '../../shared/components/common/Card';
import { Badge } from '../../shared/components/common/Badge';
import { Button } from '../../shared/components/common/Button';
import { useAsync } from '../../shared/hooks/useAsync';
import { dashboardService } from '../../shared/services/dashboardService';
import { useAuth } from '../../app/providers/AuthProvider';

export const LearnerDashboardPage: React.FC = () => {
  const [section, setSection] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [submittedIds, setSubmittedIds] = useState<string[]>([]);
  const { user } = useAuth();

  const fetchDashboard = useCallback(() => dashboardService.getLearnerDashboard(), []);
  const { data, loading, error } = useAsync(fetchDashboard);

  const firstName = (user?.fullName || 'Priya Sharma').split(' ')[0];

  const handleCompleteAssignment = (id: string) => {
    setSubmittedIds((prev) => [...prev, id]);
  };

  return (
    <DashboardLayout
      role="Learner"
      activeSection={section}
      onSelectSection={setSection}
      pageTitle="Learner Dashboard"
      searchQuery={search}
      onSearchChange={setSearch}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="hidden sm:block text-2xl font-bold text-slate-900">
            Learner Dashboard
          </h1>
          <Link
            to="/courses"
            className="text-sm font-semibold text-violet-600 hover:text-violet-700"
          >
            + Browse More Courses
          </Link>
        </div>

        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-6 sm:p-8 text-white shadow-lg shadow-violet-600/20">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Welcome back, {firstName}! 👋
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-violet-100">
              Continue learning and build your skills.
            </p>
          </div>
          <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
            <Laptop className="h-10 w-10 text-violet-100" />
            <div>
              <p className="text-xs font-semibold text-violet-200">Next Live Lab</p>
              <p className="text-sm font-bold">ASP.NET Core APIs • 7:00 PM</p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            Loading your learning workspace...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {error}
          </div>
        )}

        {data && (
          <>
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard value={data.activeCoursesCount} label="Active Courses" accent="blue" />
              <StatCard value={data.liveSessionsCount} label="Live Sessions" accent="indigo" />
              <StatCard
                value={Math.max(0, data.assignmentsDueCount - submittedIds.length)}
                label="Assignments Due"
                accent="amber"
              />
              <StatCard value={data.certificatesCount} label="Certificates" accent="violet" />
            </div>

            {/* Continue Learning + Upcoming Sessions */}
            {(section === 'dashboard' || section === 'learning') && (
              <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Continue Learning</h3>
                    <button
                      onClick={() => setSection('learning')}
                      className="text-xs font-semibold text-violet-600 hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  {data.continueLearning
                    .filter((c) =>
                      c.title.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((course) => (
                      <Card key={course.id} className="p-5">
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-16 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${course.gradientClass} text-white font-bold text-sm shadow-sm`}
                          >
                            {course.techTag}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-900 line-clamp-2">
                              {course.title}
                            </h4>
                            <div className="mt-3 flex items-center gap-3">
                              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
                                  style={{ width: `${course.progressPercent ?? 50}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold text-slate-700">
                                {course.progressPercent ?? 50}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <Link to={`/cohorts/${course.slug}`} className="mt-4 block">
                          <Button variant="outline" className="w-full">
                            Continue
                          </Button>
                        </Link>
                      </Card>
                    ))}
                </div>

                {/* Upcoming Sessions */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Upcoming Sessions</h3>
                    <Link
                      to="/live-class"
                      className="text-xs font-semibold text-violet-600 hover:underline"
                    >
                      View All
                    </Link>
                  </div>

                  <Card className="divide-y divide-slate-100">
                    {data.upcomingSessions.map((sess) => (
                      <div
                        key={sess.id}
                        className="flex items-center justify-between gap-4 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-500">
                              {sess.scheduleText}
                            </p>
                            <p className="text-sm font-semibold text-slate-900">
                              {sess.title}
                            </p>
                          </div>
                        </div>
                        <Link to="/live-class">
                          <Button size="sm">Join</Button>
                        </Link>
                      </div>
                    ))}
                  </Card>

                  {/* Assignments Preview */}
                  <h3 className="pt-2 text-lg font-bold text-slate-900">
                    Assignments &amp; Deliverables
                  </h3>
                  <Card className="divide-y divide-slate-100">
                    {data.assignments.map((asg) => {
                      const isDone =
                        asg.status !== 'Pending' || submittedIds.includes(asg.id);
                      return (
                        <div
                          key={asg.id}
                          className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex items-start gap-3">
                            <FileText className="mt-0.5 h-4 w-4 text-violet-600 shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                {asg.title}
                              </p>
                              <p className="text-xs text-slate-500">
                                {asg.courseTitle} • Due: {asg.dueDate}
                              </p>
                            </div>
                          </div>
                          {isDone ? (
                            <Badge variant="emerald">
                              <CheckCircle2 className="mr-1 h-3 w-3" /> Submitted
                            </Badge>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCompleteAssignment(asg.id)}
                            >
                              Mark Done
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </Card>
                </div>
              </div>
            )}

            {/* Certificates Section */}
            {(section === 'dashboard' || section === 'certificates') && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">Earned Certificates</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {data.certificates.map((cert) => (
                    <Card key={cert.id} className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                          <Award className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{cert.title}</p>
                          <p className="text-xs text-slate-500">
                            Issued {cert.issuedDate} • ID: {cert.credentialCode}
                          </p>
                        </div>
                      </div>
                      <Badge variant="purple">Verified</Badge>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LearnerDashboardPage;
