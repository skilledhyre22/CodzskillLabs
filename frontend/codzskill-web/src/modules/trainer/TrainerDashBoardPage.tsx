
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authToken } from "../../shared/api/axiosInstance";

import { getUserRole } from "../../shared/services/authService";
import GetTrainerCourses from "../../pages/trainer/GetTrainerCourses";
import GetApprovedCohorts from "../../pages/trainer/GetApprovedCohorts";


const TrainerDashboard = () => {
  const navigate = useNavigate();
  const role = getUserRole();

  const handleLogout = () => {
    localStorage.removeItem(authToken);
    toast.success("LoggedOut Successfully");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 lg:px-8">

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white shadow-sm">
              C
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {role}
              </h1>
              <p className="text-sm text-slate-500">
                CodzSkill Labs Trainer Portal
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back to Home
            </button>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              Logout
            </button>
          </div>

        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8">

        {/* Welcome Section */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 p-8 shadow-lg">

          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-200">
            Trainer Workspace
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            Welcome, {role}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
            Manage your courses, create new learning content and track
            your course approval status from one place.
          </p>

          <button
            onClick={() => navigate("/create-course")}
            className="mt-6 rounded-lg bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
          >
            + Create New Course
          </button>

        </div>

        {/* My Courses */}
        <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5">
            <div className="flex flex-wrap items-center justify-between gap-3">

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  My Courses
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  View and manage your approved courses.
                </p>
              </div>

              <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                Course Management
              </span>

            </div>
          </div>

          <div className="p-6">
            <GetTrainerCourses />
          </div>

        </section>

        {/* My Cohorts */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5">
            <div className="flex flex-wrap items-center justify-between gap-3">

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  My Published Cohorts
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  View cohorts approved and published by Admin.
                </p>
              </div>

              <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                Cohort Management
              </span>

            </div>
          </div>

          <div className="p-6">
            <GetApprovedCohorts />
          </div>

        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-slate-200 py-5 text-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} CodzSkill Labs. All rights reserved.
          </p>
        </footer>

      </main>
    </div>
  );
};

export default TrainerDashboard;
