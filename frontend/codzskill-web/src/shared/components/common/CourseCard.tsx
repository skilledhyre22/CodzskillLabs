
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';
import type { Course } from '../../types';
import { formatInr } from '../../utilis/formatters';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link
      to={`/cohorts/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg"
    >
      <div
        className={`relative flex h-40 items-center justify-between bg-gradient-to-br ${course.gradientClass} p-5 text-white`}
      >
        <div className="flex h-14 w-20 items-center justify-center rounded-xl border border-white/25 bg-white/10 backdrop-blur-md font-bold text-lg tracking-tight shadow-inner">
          {course.techTag}
        </div>
        <span className="self-start rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
          {course.badgeText}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-violet-700 transition-colors line-clamp-2">
            {course.title}
          </h3>
          <p className="mt-1.5 text-xs text-slate-500 line-clamp-2">
            {course.subtitle}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {course.rating.toFixed(1)}{' '}
              <span className="font-normal text-slate-400">
                ({course.reviewCount.toLocaleString()})
              </span>
            </span>
            <span className="inline-flex items-center gap-1 text-slate-500">
              <Clock className="h-3.5 w-3.5" />
              {course.durationWeeks} Weeks
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold text-slate-900">
              {formatInr(course.priceInr)}
            </span>
            <span className="text-xs font-semibold text-violet-600 group-hover:underline">
              View Cohort &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
