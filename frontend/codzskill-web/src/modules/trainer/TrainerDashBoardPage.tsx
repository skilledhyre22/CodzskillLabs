
import React, { useCallback, useState } from 'react';
import { MoreHorizontal, Plus, Star, Users } from 'lucide-react';
import { DashboardLayout } from '../../shared/layouts/DashboardLayout';
import { StatCard } from '../../shared/components/common/StatCard';
import { Card } from '../../shared/components/common/Card';
import { Badge } from '../../shared/components/common/Badge';
import { Button } from '../../shared/components/common/Button';
import { Modal } from '../../shared/components/common/Modal';
import { useAsync } from '../../shared/hooks/useAsync';
import { dashboardService } from '../../shared/services/dashboardService';
import { formatInr } from '../../shared/utilis/formatters';
import type { CourseCategory } from '../../shared/types';

export const TrainerDashboardPage: React.FC = () => {
  const [section, setSection] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Exclude<CourseCategory, 'All'>>('Development');
  const [techTag, setTechTag] = useState('.NET');
  const [priceInr, setPriceInr] = useState('14999');
  const [formError, setFormError] = useState('');

  const fetchTrainerData = useCallback(() => dashboardService.getTrainerDashboard(), []);
  const { data, setData, loading, error } = useAsync(fetchTrainerData);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 4) {
      setFormError('Course title must be at least 4 characters.');
      return;
    }
    setFormError('');
    setCreating(true);
    try {
      const created = await dashboardService.createTrainerCourse({
        title: title.trim(),
        category,
        techTag,
        priceInr: Number(priceInr) || 12999,
      });
      if (data) {
        setData({
          ...data,
          publishedCoursesCount: data.publishedCoursesCount + 1,
          courses: [created, ...data.courses],
        });
      }
      setTitle('');
      setCreateOpen(false);
    } finally {
      setCreating(false);
    }
  };

  return (
    <DashboardLayout
      role="Trainer"
      activeSection={section}
      onSelectSection={setSection}
      pageTitle="Trainer Dashboard"
      searchQuery={search}
      onSearchChange={setSearch}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="hidden sm:block text-2xl font-bold text-slate-900">
            Trainer Dashboard
          </h1>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" /> Create Course
          </Button>
        </div>

        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            Loading trainer analytics...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {error}
          </div>
        )}

        {data && (
          <>
            {/* 4 Stat Cards matching screenshot */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <StatCard
                value={data.publishedCoursesCount}
                label="Published Courses"
                accent="blue"
              />
              <StatCard
                value={data.activeCohortsCount}
                label="Active Cohorts"
                accent="indigo"
              />
              <StatCard
                value={data.oneOnOneSessionsCount}
                label="1:1 Sessions (This Month)"
                accent="violet"
              />
              <StatCard
                value={formatInr(data.totalEarningsInr)}
                label="Total Earnings"
                accent="emerald"
              />
            </div>

            {/* My Courses Management */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">My Courses</h2>
                <span className="text-xs text-slate-500">
                  {data.courses.length} active programs
                </span>
              </div>

              <div className="space-y-3">
                {data.courses
                  .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
                  .map((course) => (
                    <Card
                      key={course.id}
                      className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-14 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${course.gradientClass} text-white font-bold text-sm`}
                        >
                          {course.techTag}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{course.title}</h3>
                          <p className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                            <span>{course.learnersCount} Learners</span>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                              {course.rating.toFixed(1)}
                              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        <Badge variant="emerald">{course.status || 'Published'}</Badge>
                        <button
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          aria-label="Course options"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>

            {/* Learner Management Table */}
            <div className="space-y-3">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <Users className="h-5 w-5 text-violet-600" />
                Enrolled Learners
              </h2>
              <Card className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-100 bg-slate-50/70 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-5 py-3">Learner</th>
                      <th className="px-5 py-3">Cohort</th>
                      <th className="px-5 py-3">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.learners.map((learner) => (
                      <tr key={learner.id} className="hover:bg-slate-50/60">
                        <td className="px-5 py-3.5">
                          <p className="font-semibold text-slate-900">{learner.name}</p>
                          <p className="text-xs text-slate-500">{learner.email}</p>
                        </td>
                        <td className="px-5 py-3.5 text-slate-600">{learner.cohort}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-violet-600"
                                style={{ width: `${learner.progress}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-slate-700">
                              {learner.progress}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          </>
        )}
      </div>

      {/* Create Course Modal */}
      <Modal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create New Cohort Course"
      >
        <form onSubmit={handleCreateCourse} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Course Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Microservices with ASP.NET Core 10"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-violet-500 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Category
              </label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as Exclude<CourseCategory, 'All'>)
                }
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none"
              >
                <option value="Development">Development</option>
                <option value="AI & Data">AI &amp; Data</option>
                <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Price (INR)
              </label>
              <input
                type="number"
                value={priceInr}
                onChange={(e) => setPriceInr(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-violet-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Badge Label
            </label>
            <input
              type="text"
              value={techTag}
              onChange={(e) => setTechTag(e.target.value)}
              placeholder=".NET / React / AI"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-violet-500 focus:outline-none"
            />
          </div>

          {formError && <p className="text-xs text-rose-600">{formError}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={creating}>
              Publish Course
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
