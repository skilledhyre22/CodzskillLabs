
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import type { CourseResponse } from "../../shared/types";
import { CourseStatus } from "../../shared/enums/Enums";

import {
  filterCourse,
  getPublishedCourses,
  searchCourses,
} from "../../shared/services/courseService";

const GetTrainerCourses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<CourseResponse[]>([]);
  const [displayCourses, setDisplayCourses] = useState<CourseResponse[]>([]);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const maxPrice =
    courses.length > 0
      ? Math.max(...courses.map((course) => course.price))
      : 0;

  // Fetch Published Courses
  const fetchCourses = async () => {
    setLoading(true);

    try {
      const response = await getPublishedCourses();

      if (response.isSuccess) {
        const approvedCourses = (response.data ?? []).filter(
          (course) => course.status === CourseStatus.Approved
        );

        setCourses(approvedCourses);
        setDisplayCourses(approvedCourses);

        const highestPrice =
          approvedCourses.length > 0
            ? Math.max(...approvedCourses.map((course) => course.price))
            : 0;

        setPrice(highestPrice);
      } else {
        setCourses([]);
        setDisplayCourses([]);
        toast.error(response.problemDetails?.title);
      }
    } catch (error) {
      setCourses([]);
      setDisplayCourses([]);
      toast.error("Unable to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  // Search Courses
  const searchCourse = async () => {
    if (!search.trim()) {
      toast.error("Please enter course name");
      return;
    }

    setLoading(true);

    try {
      const response = await searchCourses(search.trim());

      if (response.isSuccess) {
        const approvedCourses = (response.data ?? []).filter(
          (course) => course.status === CourseStatus.Approved
        );

        setDisplayCourses(approvedCourses);
      } else {
        setDisplayCourses([]);
        toast.error(response.problemDetails?.title);
      }
    } catch (error) {
      setDisplayCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter Trainer's Courses By Price
  const filterCourseByPrice = async () => {
    setLoading(true);

    try {
      const response = await filterCourse(price);

      if (response.isSuccess) {
        const approvedCourses = (response.data ?? []).filter(
          (course) => course.status === CourseStatus.Approved
        );

        setDisplayCourses(approvedCourses);
      } else {
        setDisplayCourses([]);
        toast.error(response.problemDetails?.title);
      }
    } catch (error) {
      setDisplayCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Clear Search And Price Filters
  const clearFilters = () => {
    setSearch("");
    setPrice(maxPrice);
    setDisplayCourses(courses);
  };

  // Get Category Name
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
            Loading your courses...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-600" />
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Trainer Dashboard
            </p>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            My Courses
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and view your admin-approved courses.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-xl">
              📚
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Approved Courses
              </p>
              <p className="text-xl font-bold text-slate-900">
                {courses.length}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/create-course")}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
          >
            + Create Course
          </button>
          <button
            type="button"
            onClick={() => navigate("/update-candidate-profile")}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
          >
            + Update Profile
          </button>
        </div>
      </div>

      {/* Waiting for Approval Message */}
      {courses.length === 0 ? (
        <div className="rounded-2xl border border-amber-200 bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl">
            ⏳
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Your Courses Are Awaiting Approval
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500">
            Your submitted courses will appear here once they are reviewed
            and approved by the Admin. Please wait for the approval process
            to complete. Thank you for your patience!
          </p>

          <button
            type="button"
            onClick={() => navigate("/create-course")}
            className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            + Create Another Course
          </button>
        </div>
      ) : (
        <>
          {/* Search & Filter */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-800">Find Courses</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Search by course name or filter by price.
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

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      🔍
                    </span>

                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") searchCourse();
                      }}
                      placeholder="Enter course name..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={searchCourse}
                    className="rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Maximum Price
                  </label>

                  <span className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-bold text-indigo-700">
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  step="1"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  disabled={maxPrice === 0}
                  className="w-full cursor-pointer accent-indigo-600"
                />

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400">₹0</span>

                  <button
                    type="button"
                    onClick={filterCourseByPrice}
                    disabled={maxPrice === 0}
                    className="rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-700 transition hover:bg-indigo-100 disabled:opacity-50"
                  >
                    Apply Price Filter
                  </button>

                  <span className="text-xs text-slate-400">
                    ₹{maxPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Listing Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                My Approved Courses
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Courses approved by the Admin.
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
              Showing {displayCourses.length} courses
            </span>
          </div>

          {/* Course Cards / Empty State */}
          {displayCourses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                🔍
              </div>

              <h3 className="mt-4 font-bold text-slate-800">
                No Matching Courses
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                No courses found for your search or selected price.
                Try changing your search keyword or price filter.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Reset Filters
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

                      <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                        Approved
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

                  <div className="mb-4 rounded-xl bg-indigo-50 p-3">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-indigo-400">
                      Created By
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold text-indigo-800">
                      {course.courseCreatedBy || "Unknown"}
                    </p>
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

                      <button
                        type="button"
                        onClick={() => navigate("/course/" + course.id)}
                        className="w-full rounded-xl bg-indigo-600 px-3 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GetTrainerCourses;
