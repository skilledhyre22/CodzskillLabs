
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import type { CourseResponse } from "../../shared/types";
import { CourseStatus } from "../../shared/enums/Enums";

import {
  getAllCourses,
  getCoursesBySearchandPrice,
} from "../../shared/services/courseService";

const GetAllCourses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const [displayCourses, setDisplayCourses] = useState<CourseResponse[]>([]);
  const [search, setSearch] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    setLoading(true);

    const response = await getAllCourses();

    if (response.isSuccess) {
      setCourses(response.data);
      setDisplayCourses(response.data);
    } else {
      setCourses([]);
      setDisplayCourses([]);
      toast.error(response.problemDetails?.title);
    }

    setLoading(false);
  };

  // Search and Sort Courses
  const searchAndSortCourses = async () => {
    setLoading(true);

    const response = await getCoursesBySearchandPrice(
      search.trim() || undefined,
      sortByPrice || undefined
    );

    if (response.isSuccess) {
      setDisplayCourses(response.data);
    } else {
      setDisplayCourses([]);
      toast.error(response.problemDetails?.title);
    }

    setLoading(false);
  };

  // Clear Filters
  const clearFilters = () => {
    setSearch("");
    setSortByPrice("");
    setDisplayCourses(courses);
  };

  const getStatusStyle = (status: CourseStatus) => {
    switch (status) {
      case CourseStatus.Approved:
        return "bg-emerald-100 text-emerald-700 ring-emerald-200";

      case CourseStatus.Pending:
        return "bg-amber-100 text-amber-700 ring-amber-200";

      case CourseStatus.Rejected:
        return "bg-red-100 text-red-700 ring-red-200";

      default:
        return "bg-slate-100 text-slate-600 ring-slate-200";
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

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-2xl bg-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
          <p className="mt-3 text-sm font-medium text-slate-500">
            Loading courses...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => navigate("/create-course")}
        className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
      >
        + Create Course
      </button>

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-600" />
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Platform Management
            </p>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Course Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and monitor all courses submitted by trainers.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-xl">
            📚
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">
              Total Courses
            </p>
            <p className="text-xl font-bold text-slate-900">
              {courses.length}
            </p>
          </div>
        </div>
      </div>

      {/* Search & Sort */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-800">Find Courses</h2>
            <p className="mt-1 text-xs text-slate-500">
              Search by course name or sort by price.
            </p>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Search */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Search Course
            </label>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchAndSortCourses();
                }
              }}
              placeholder="Enter course name..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Price Sorting */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Sort By Price
            </label>

            <select
              value={sortByPrice}
              onChange={(e) => setSortByPrice(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">Default</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={searchAndSortCourses}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Course Listing Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">All Courses</h2>
          <p className="mt-1 text-xs text-slate-500">
            Review course information and approval status.
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
          Showing {displayCourses.length} courses
        </span>
      </div>

      {/* Course Cards */}
      {displayCourses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
            📚
          </div>

          <h3 className="mt-4 font-bold text-slate-800">
            No Courses Found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            No courses match your search.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {displayCourses.map((course) => (
            <div
              key={course.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
            >
              {/* Card Header */}
              <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800 px-5 py-6">
                <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-12 right-20 h-28 w-28 rounded-full bg-white/10" />

                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-2xl">
                    📘
                  </div>

                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-bold ring-1 ${getStatusStyle(course.status)}`}
                  >
                    {getStatusLabel(course.status)}
                  </span>
                </div>

                <div className="relative mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-100">
                    {getCategoryName(course.category)}
                  </p>

                  <h3 className="mt-2 line-clamp-2 min-h-[56px] text-xl font-bold leading-7 text-white">
                    {course.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-5">
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-slate-400">
                    Description
                  </p>

                  <p className="line-clamp-3 min-h-[60px] text-sm leading-5 text-slate-600">
                    {course.description || "No description available."}
                  </p>
                </div>

                {/* Created By */}
                <div className="mb-4 rounded-xl bg-indigo-50 p-3">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-indigo-400">
                    Created By
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold text-indigo-800">
                    {course.courseCreatedBy || "Unknown"}
                  </p>
                </div>

                {/* Badge Label */}
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    Badge Label
                  </p>

                  <p className="mt-1 truncate text-xs font-semibold text-slate-700">
                    {course.badgeLabel || "Not assigned"}
                  </p>
                </div>

                {/* Price & Actions */}
                <div className="mt-auto border-t border-slate-100 pt-4">
                  <div className="mb-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                      Course Price
                    </p>

                    <p className="mt-1 text-2xl font-extrabold text-slate-900">
                      ₹{course.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => navigate("/course/" + course.id)}
                      className="rounded-xl bg-indigo-600 px-3 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
                    >
                      View Details →
                    </button>
                     <button
                        type="button"
                        onClick={() => navigate("/cohort-by-course/" + course.id)}
                        className="w-full rounded-xl bg-indigo-600 px-3 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
                      >
                        Cohort of Courses →
                      </button>

                    <button
                      type="button"
                      onClick={() =>
                        navigate("/update-course-status/" + course.id)
                      }
                      className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-100 active:scale-95"
                    >
                      Update Status →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllCourses;
