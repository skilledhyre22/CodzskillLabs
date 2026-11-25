import { useEffect, useState } from "react";
import type { TrainerResponse } from "../../shared/types";
import { useNavigate, useParams } from "react-router-dom";
import { getTrainerById } from "../../shared/services/trainerService";
import { toast } from "react-toastify";

const GetTrainerDetails = () => {
  const [trainer, setTrainer] = useState<TrainerResponse>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchById = async () => {
    if (!id) {
      toast.error("Trainer ID not found");
      return;
    }

    setLoading(true);

    const response = await getTrainerById(id);

    if (response.isSuccess) {
      setTrainer(response.data);
    } else {
      toast.error(
        response.problemDetails?.title || "Failed to fetch trainer details"
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchById();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
        <p className="mt-4 text-sm font-medium text-slate-500">
          Loading trainer details...
        </p>
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center">
        <h2 className="text-xl font-bold text-slate-800">
          Trainer Not Found
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          No trainer details are available.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Trainer Details
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            View and manage trainer profile information.
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="w-fit rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          ← Back
        </button>
      </div>

      {/* Profile Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-white/30 bg-white/20 text-3xl font-bold text-white">
              {trainer.fullName.charAt(0).toUpperCase()}
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">
                {trainer.fullName}
              </h3>

              <p className="mt-1 text-sm text-indigo-100">
                {trainer.email}
              </p>

              <span className="mt-3 inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-semibold text-white">
                {trainer.role}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="p-6 sm:p-8">
          <h3 className="mb-6 text-lg font-bold text-slate-800">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Full Name
              </p>
              <p className="mt-2 font-semibold text-slate-800">
                {trainer.fullName}
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Email Address
              </p>
              <p className="mt-2 break-all font-semibold text-slate-800">
                {trainer.email}
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Primary Skill
              </p>
              <p className="mt-2 font-semibold text-slate-800">
                {trainer.primarySkill}
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Years of Experience
              </p>
              <p className="mt-2 font-semibold text-slate-800">
                {trainer.yearsOfExperience} Years
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Account Role
              </p>
              <p className="mt-2 font-semibold text-indigo-600">
                {trainer.role}
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Joined Date
              </p>
              <p className="mt-2 font-semibold text-slate-800">
                {new Date(trainer.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Update Button */}
          <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
            <button
              onClick={() =>
                navigate(`/update-trainer-details/${trainer.id}`)
              }
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98]"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetTrainerDetails;