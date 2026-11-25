
import { useEffect, useState } from "react";
import type { UserListResponse } from "../../shared/types";
import {
  getUsersPagination,
  searchUsers,
  filterUsers,
} from "../../shared/services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GetAllUsers = () => {
  const [users, setUsers] = useState<UserListResponse[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState("");
  const [isDeleted, setIsDeleted] = useState("");

  const navigate = useNavigate();

  const fetchAllUsers = async () => {
    setLoading(true);

    const response = await getUsersPagination(1, 10);

    if (response.isSuccess) {
      setUsers(response.data);
    } else {
      setUsers([]);
      toast.error(response.problemDetails?.title);
    }

    setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    setIsSearched(true);

    const response = await searchUsers(name.trim(), email.trim());

    if (response.isSuccess) {
      setUsers(response.data);
    } else {
      setUsers([]);
      toast.error(response.problemDetails?.title);
    }

    setLoading(false);
  };

  const handleFilter = async () => {
    setLoading(true);
    setIsSearched(true);

    const response = await filterUsers(
      role || undefined,
      isActive === "" ? undefined : isActive === "true",
      isDeleted === "" ? undefined : isDeleted === "true"
    );

    if (response.isSuccess) {
      setUsers(response.data);
    } else {
      setUsers([]);
      toast.error(response.problemDetails?.title);
    }

    setLoading(false);
  };

  const clearFilters = () => {
    setName("");
    setEmail("");
    setRole("");
    setIsActive("");
    setIsDeleted("");
    setIsSearched(false);
    fetchAllUsers();
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="space-y-6">

      {/* Search and Filters */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

        {/* Search */}
        <div>
          <h3 className="text-sm font-bold text-slate-800">
            Search Users
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Find users using their name or email address.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_auto]">
            <input
              type="text"
              placeholder="Search by first or last name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <input
              type="text"
              placeholder="Search by email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <button
              onClick={handleSearch}
              disabled={loading}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Search Users
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-slate-200" />

        {/* Filters */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Filter Users
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Narrow down users based on their role and account status.
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">All Roles</option>
              <option value="Candidate">Candidate</option>
              <option value="Trainer">Trainer</option>
              <option value="SuperAdmin">SuperAdmin</option>
            </select>

            <select
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <select
              value={isDeleted}
              onChange={(e) => setIsDeleted(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">All Accounts</option>
              <option value="false">Available</option>
              <option value="true">Deleted</option>
            </select>

            <button
              onClick={handleFilter}
              disabled={loading}
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Apply Filters
            </button>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              disabled={loading}
              className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800 disabled:opacity-50"
            >
              Clear Search & Filters
            </button>
          </div>
        </div>
      </div>

      {/* User List Heading */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Registered Users
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Manage and view platform user accounts.
          </p>
        </div>

        <span className="rounded-full bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-700">
          {users.length} Users
        </span>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-16">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading users...
          </p>
        </div>
      ) : users.length > 0 ? (

        /* User Cards */
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
            >
              {/* User Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-700">
                    {user.firstName?.charAt(0).toUpperCase()}
                    {user.lastName?.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h4 className="truncate font-bold text-slate-900">
                      {user.firstName} {user.lastName}
                    </h4>

                    <p className="truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                  {user.role}
                </span>
              </div>

              {/* Divider */}
              <div className="my-5 border-t border-slate-100" />

              {/* Account Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Account Status
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Account Availability
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.isDeleted
                        ? "bg-red-50 text-red-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {user.isDeleted ? "Deleted" : "Available"}
                  </span>
                </div>
              </div>

              {/* View Details */}
              <button
                onClick={() => navigate("/user/" + user.id)}
                className="mt-6 w-full rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-600 hover:text-white"
              >
                View User Details →
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
            👥
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-800">
            No Users Found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {isSearched
              ? "No users match your search or selected filters."
              : "There are no registered users to display."}
          </p>

          {isSearched && (
            <button
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default GetAllUsers;
