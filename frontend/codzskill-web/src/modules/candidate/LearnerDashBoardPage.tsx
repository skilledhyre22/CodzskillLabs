
import { useState } from "react";
import CandidateProfile from "./CandidateProfile";
import UpdateProfile from "./UpdateProfile";
import { authToken } from "../../shared/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LearnerDashBoardPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate=useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(authToken);
    toast.success("Logged Out")
    navigate("/login", { replace: true });
  };
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
<button
  onClick={handleLogout}
  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
>
  Logout
</button>
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          Learner Dashboard
        </h1>

        <p className="mb-8 text-sm text-slate-500">
          Manage your profile and personal information.
        </p>

        <div className="mb-8 flex gap-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-3 text-sm font-semibold ${
              activeTab === "profile"
                ? "border-b-2 border-violet-600 text-violet-600"
                : "text-slate-500"
            }`}
          >
            My Profile
          </button>

          <button
            onClick={() => setActiveTab("update")}
            className={`pb-3 text-sm font-semibold ${
              activeTab === "update"
                ? "border-b-2 border-violet-600 text-violet-600"
                : "text-slate-500"
            }`}
          >
            Update Profile
          </button>
        </div>

        {activeTab === "profile" && <CandidateProfile />}

        {activeTab === "update" && <UpdateProfile />}

      </div>
    </div>
  );
};

export default LearnerDashBoardPage;
