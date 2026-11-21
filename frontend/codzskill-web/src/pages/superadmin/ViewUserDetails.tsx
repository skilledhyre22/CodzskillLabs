
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteUser,
  getUserById,
  restoreUser,
  updateStatus,
  assignRole,
} from "../../shared/services/userService";
import { useEffect, useState } from "react";
import type { UserListResponse, RoleResponse } from "../../shared/types";
import { toast } from "react-toastify";
import { getRoles } from "../../shared/services/roleService";

const ViewUserDetails = () => {
  const navigate = useNavigate();

  const [user, Setuser] = useState<UserListResponse>();
  const [roles, setRoles] = useState<RoleResponse[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState("");

  const { id } = useParams();

  const fetchById = async () => {
    const response = await getUserById(id as string);

    if (response.isSuccess) {
      Setuser(response.data);
    } else {
      toast.error(response.problemDetails?.title);
    }
  };

  const AllRoles = async () => {
    const response = await getRoles();

    if (response.isSuccess) {
      setRoles(response.data);
    } else {
      toast.error(response.problemDetails?.title);
    }
  };

  useEffect(() => {
    fetchById();
    AllRoles();
  }, []);

  const changeStatus = async () => {
    const response = await updateStatus(id as string, {
      isActive: !user?.isActive,
    });

    if (response.isSuccess) {
      toast.success(response.message);
      fetchById();
    } else {
      toast.error(response.problemDetails?.title);
    }
  };

  const DeleteUser = async (id: string) => {
    const response = await deleteUser(id);

    if (response.isSuccess) {
      toast.success(response.message);
      fetchById();
    } else {
      toast.error(response.problemDetails?.title);
    }
  };

  const RestoreUser = async (id: string) => {
    const response = await restoreUser(id);

    if (response.isSuccess) {
      toast.success(response.message);
      fetchById();
    } else {
      toast.error(response.problemDetails?.title);
    }
  };

  const handleAssignRole = async () => {
    if (!selectedRoleId) {
      toast.error("Please select a role");
      return;
    }

    const response = await assignRole({
      userId: id as string,
      roleId: selectedRoleId,
    });

    if (response.isSuccess) {
      toast.success(response.message);
      setSelectedRoleId("");
      fetchById();
    } else {
      toast.error(response.problemDetails?.title);
    }
  };

  if (!user) {
    return <p className="p-6 text-gray-500">Loading user details...</p>;
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          User Details
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-semibold text-gray-800">
              {user.firstName} {user.lastName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold text-gray-800">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-semibold text-gray-800">{user.role}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Account Status</p>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                user.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-500">Deleted Status</p>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                user.isDeleted
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {user.isDeleted ? "Deleted" : "Not Deleted"}
            </span>
          </div>
        </div>

        {/* User Actions */}
        <div className="mt-8 flex flex-wrap gap-3 border-t pt-5">
          <button
            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            onClick={() => navigate("/update-user/" + user.id)}
          >
            Update User
          </button>

          {!user.isDeleted ? (
            <button
              onClick={() => DeleteUser(user.id)}
              className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Delete User
            </button>
          ) : (
            <button
              onClick={() => RestoreUser(user.id)}
              className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Restore User
            </button>
          )}

          {!user.isDeleted && (
            <button
              onClick={changeStatus}
              className="rounded-lg bg-slate-700 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              {user.isActive ? "Deactivate User" : "Activate User"}
            </button>
          )}
        </div>

        {/* Assign Role */}
        {!user.isDeleted && (
          <div className="mt-6 flex flex-wrap gap-3 border-t pt-5">
            <select
              value={selectedRoleId}
              onChange={(e) => setSelectedRoleId(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2"
            >
              <option value="">Select Role</option>

              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleAssignRole}
              disabled={!selectedRoleId}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              Assign Role
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUserDetails;
