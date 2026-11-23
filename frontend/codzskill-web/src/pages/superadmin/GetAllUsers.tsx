
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

  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState("");
  const [isDeleted, setIsDeleted] = useState("");

  const navigate = useNavigate();

  const fetchAllUsers = async () => {
    const response = await getUsersPagination(1,10);

    if (response.isSuccess) {
      setUsers(response.data);
      console.log("response",response)
    } else {
      toast.error(response.problemDetails?.title);
    }
  };

  const handleSearch = async () => {
    setIsSearched(true);

    const response = await searchUsers(name, email);

    if (response.isSuccess) {
      setUsers(response.data);
    } else {
      setUsers([]);
      toast.error(response.problemDetails?.title);
    }
  };

  const handleFilter = async () => {
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
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      {/* Search */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-gray-300 p-2 outline-none focus:border-indigo-500"
        />

        <input
          type="text"
          placeholder="Search by email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border border-gray-300 p-2 outline-none focus:border-indigo-500"
        />

        <button
          onClick={handleSearch}
          className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
        >
          Search
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-lg border border-gray-300 p-2"
        >
          <option value="">All Roles</option>
          <option value="Candidate">Candidate</option>
          <option value="Trainer">Trainer</option>
          <option value="SuperAdmin">SuperAdmin</option>
        </select>

        <select
          value={isActive}
          onChange={(e) => setIsActive(e.target.value)}
          className="rounded-lg border border-gray-300 p-2"
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <select
          value={isDeleted}
          onChange={(e) => setIsDeleted(e.target.value)}
          className="rounded-lg border border-gray-300 p-2"
        >
          <option value="">All Accounts</option>
          <option value="false">Not Deleted</option>
          <option value="true">Deleted</option>
        </select>

        <button
          onClick={handleFilter}
          className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
        >
          Apply Filter
        </button>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {user.email}
              </p>

              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Role: <span className="font-medium">{user.role}</span>
                </p>

                <p className="mt-2 text-sm">
                  Status:{" "}
                  <span className={user.isActive ? "text-green-600" : "text-red-600"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </p>

                <p className="mt-2 text-sm">
                  Account:{" "}
                  <span className={user.isDeleted ? "text-red-600" : "text-green-600"}>
                    {user.isDeleted ? "Deleted" : "Available"}
                  </span>
                </p>
              </div>

              <button
                onClick={() => navigate("/user/" + user.id)}
                className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                View Details
              </button>
            </div>
          ))
        ) : isSearched ? (
          <p className="col-span-full py-8 text-center text-gray-500">
            No results found.
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default GetAllUsers;
