
import { useNavigate } from "react-router-dom";
import GetAllUsers from "../../pages/superadmin/GetAllUsers";
import { authToken } from "../../shared/api/axiosInstance";
import { toast } from "react-toastify";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
const handleLogout = () => {
  localStorage.removeItem(authToken);
  toast.success("LoggedOut Successfully")
  navigate("/login", { replace: true });
};
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
  onClick={handleLogout}
  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
>
  Logout
</button>
      {/* Dashboard Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Super Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage users, roles and account access.
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Back to Home
        </button>
      </div>

      {/* Dashboard Content */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            User Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            View, search, filter and manage all platform users.
          </p>
        </div>

        <GetAllUsers />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
