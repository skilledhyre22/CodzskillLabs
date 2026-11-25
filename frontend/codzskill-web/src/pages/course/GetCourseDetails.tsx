
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { CourseResponse } from "../../shared/types";
import { getCourseById } from "../../shared/services/courseService";
import { toast } from "react-toastify";
import { CourseStatus } from "../../shared/enums/Enums";

const GetCourseDetails = () => {
  const [course, SetCourse] = useState<CourseResponse>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const fetchById = async () => {
    const response = await getCourseById(id as string);

    if (response.isSuccess && response.data) {
      SetCourse(response.data);
    } else {
      SetCourse(undefined);
      toast.error(response.problemDetails?.title || "Course not found");
    }
  };

  const getCategoryName = (category: number) => {
    switch (category) {
      case 1:
        return "Development";
      case 2:
        return "AI";
      case 3:
        return "Cyber Security";
      case 4:
        return "Machine Learning";
      default:
        return "Other";
    }
  };

  const getStatusLabel = (status: CourseStatus) => {
    switch (status) {
      case CourseStatus.Approved:
        return "Approved";
      case CourseStatus.Pending:
        return "Pending";
      case CourseStatus.Rejected:
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  const getStatusStyle = (status: CourseStatus) => {
    switch (status) {
      case CourseStatus.Approved:
        return "bg-emerald-100 text-emerald-700";
      case CourseStatus.Pending:
        return "bg-amber-100 text-amber-700";
      case CourseStatus.Rejected:
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  useEffect(() => {
    if (id) {
      fetchById().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
          <p className="mt-3 text-sm font-medium text-slate-500">
            Loading course details...
          </p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50 text-4xl">
            📚
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            No Course Details Found
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Sorry, we couldn't find the course details you're looking for.
            The course may not exist or may have been removed.
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-10">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-600">
              Platform Management
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Course Details
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View and manage complete course information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            ← Back
          </button>
        </div>

        {/* Course Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Banner */}
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800 px-6 py-12 md:px-10">
            <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 right-40 h-40 w-40 rounded-full bg-white/10" />

            <div className="relative">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white">
                  {getCategoryName(course.category)}
                </span>

                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${getStatusStyle(course.status)}`}
                >
                  {getStatusLabel(course.status)}
                </span>
              </div>

              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-100">
                Explore & Learn
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl">
                {course.title}
              </h2>

              {course.badgeLabel && (
                <div className="mt-5 inline-flex rounded-lg bg-white px-4 py-2 text-xs font-bold text-indigo-700 shadow-sm">
                  ✦ {course.badgeLabel}
                </div>
              )}
            </div>
          </div>

          {/* Course Content */}
          <div className="p-6 md:p-10">

            {/* Description */}
            <div>
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                  Course Overview
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  About This Course
                </h3>
              </div>

              <p className="whitespace-pre-line text-sm leading-8 text-slate-600 md:text-base">
                {course.description ||
                  "No description available for this course."}
              </p>
            </div>

            {/* Course Information */}
            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Category
                </p>

                <p className="mt-2 font-semibold text-slate-800">
                  {getCategoryName(course.category)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Course Status
                </p>

                <p className="mt-2 font-semibold text-slate-800">
                  {getStatusLabel(course.status)}
                </p>
              </div>
            </div>

            {/* Price & Action */}
            <div className="mt-8 flex flex-col justify-between gap-5 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 sm:flex-row sm:items-center sm:p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Course Price
                </p>

                <p className="mt-2 text-3xl font-extrabold text-indigo-700">
                  ₹{course.price.toLocaleString("en-IN")}
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate(`/update-course/${course.id}`)}
                className="rounded-xl bg-indigo-600 px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
              >
                Update Course →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetCourseDetails;
