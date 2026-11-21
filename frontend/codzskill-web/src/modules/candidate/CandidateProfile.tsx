
import { useEffect, useState } from "react";
import type { UserProfileResponse } from "../../shared/types";
import { myProfile } from "../../shared/services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CandidateProfile = () => {
  const [candidate, setCandidate] = useState<UserProfileResponse>();
  const navigate = useNavigate();

  const fetchProfile = async () => {
 
      const response = await myProfile();

      if (response.isSuccess && response.data) {
        setCandidate(response.data);
      }
      else {
        toast.error(response.problemDetails.title)
    } 
}
  

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!candidate) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm font-medium text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  const fullName = `${candidate.firstName} ${candidate.lastName}`;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your personal information and account details.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Profile Header */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-8">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-violet-600 shadow-md">
                {candidate.firstName.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  {fullName}
                </h2>
                <p className="mt-1 text-sm text-violet-100">
                  Candidate Account
                </p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <h3 className="mb-6 text-lg font-semibold text-slate-900">
              Personal Information
            </h3>

            <div className="grid gap-6 sm:grid-cols-2">

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  First Name
                </p>
                <p className="mt-2 font-semibold text-slate-800">
                  {candidate.firstName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Last Name
                </p>
                <p className="mt-2 font-semibold text-slate-800">
                  {candidate.lastName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Email Address
                </p>
                <p className="mt-2 break-all font-semibold text-slate-800">
                  {candidate.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Role
                </p>
                <p className="mt-2 font-semibold text-slate-800">
                  {candidate.role.join(", ")}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Account Status
                </p>
                <span
                  className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    candidate.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {candidate.isActive ? "Active" : "Inactive"}
                </span>
              </div>

            </div>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <button
                onClick={() =>
                  navigate(`/update-candidate-profile`)
                }
                className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                Update Profile
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
