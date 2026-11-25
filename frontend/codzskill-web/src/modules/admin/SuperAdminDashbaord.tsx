
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authToken } from "../../shared/api/axiosInstance";
import { toast } from "react-toastify";
import { getUserRole } from "../../shared/services/authService";

import GetAllUsers from "../../pages/superadmin/GetAllUsers";
import GetAllCourses from "../../pages/course/GetAllCourses";
import GetAllTrainers from "../../pages/trainer/GetAllTrainers";

type DashboardSection =
  | "dashboard"
  | "users"
  | "applications"
  | "courses";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const role = getUserRole();

  const [activeSection, setActiveSection] =
    useState<DashboardSection>("dashboard");

  const handleLogout = () => {
    localStorage.removeItem(authToken);
    toast.success("LoggedOut Successfully");
    navigate("/login", { replace: true });
  };

  const menuItems: {
    id: DashboardSection;
    label: string;
    icon: string;
  }[] = [
    { id: "dashboard", label: "Dashboard", icon: "⌂" },
    { id: "users", label: "User Management", icon: "♙" },
    { id: "applications", label: "Trainer Applications", icon: "▤" },
    { id: "courses", label: "Course Management", icon: "▣" },
  ];

  const getSectionTitle = () => {
    switch (activeSection) {
      case "users":
        return "User Management";
      case "applications":
        return "Trainer Applications";
      case "courses":
        return "Course Management";
      default:
        return "Dashboard";
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return <GetAllUsers />;
        
  case "applications":
        return <GetAllTrainers />;

      case "courses":
        return <GetAllCourses />;

      default:
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 p-7 shadow-lg sm:p-10">
              <div className="relative z-10 max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200">
                  Super Admin Panel
                </p>

                <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                  Welcome Back, Super Admin!
                </h1>

                <p className="mt-3 text-sm leading-6 text-indigo-100 sm:text-base">
                  Manage users, review trainer applications, approve courses
                  and maintain your CodzSkill Labs platform.
                </p>
              </div>

              <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
              <div className="pointer-events-none absolute -bottom-28 right-40 h-64 w-64 rounded-full bg-white/5" />
            </section>

            {/* Dashboard Quick Links */}
            <section>
              <h2 className="mb-5 text-lg font-bold text-slate-900">
                Platform Management
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  {
                    id: "users" as const,
                    title: "User Management",
                    description:
                      "View, search and manage registered platform users.",
                    icon: "👥",
                    color: "bg-indigo-50",
                  },
                  {
                    id: "applications" as const,
                    title: "Trainer Applications",
                    description:
                      "Review trainer applications and manage onboarding.",
                    icon: "📋",
                    color: "bg-amber-50",
                  },
                  {
                    id: "courses" as const,
                    title: "Course Management",
                    description:
                      "Review courses and manage course approvals.",
                    icon: "📚",
                    color: "bg-emerald-50",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSection(item.id)}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${item.color}`}
                      >
                        {item.icon}
                      </div>

                      <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600">
                        →
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 flex-col bg-slate-950 text-white md:flex">

        {/* Logo */}
        <div className="flex h-20 items-center gap-3 border-b border-slate-800 px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-2xl font-bold">
            C
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-wide">
              CodzSkill
            </h1>
            <p className="text-xs text-slate-400">
              Labs Administration
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-5 py-7">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Main Menu
          </p>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  activeSection === item.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/30"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="mt-auto border-t border-slate-800 p-5">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-900 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-bold">
              SA
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                Super Admin
              </p>
              <p className="text-xs text-slate-400">{role}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-2 w-full rounded-lg px-4 py-3 text-left text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            ← Back to Home
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg px-4 py-3 text-left text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
          >
            ↪ Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="min-h-screen md:ml-64">

        {/* Top Navbar */}
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {getSectionTitle()}
              </h2>

              <p className="text-xs text-slate-500">
                Manage your platform from one place
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700">
                {role}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex gap-2 overflow-x-auto px-5 pb-3 md:hidden">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold ${
                  activeSection === item.id
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* Dynamic Section */}
        <main className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-8">
          {renderContent()}

          <footer className="border-t border-slate-200 py-6 text-center">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} CodzSkill Labs. All rights reserved.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
