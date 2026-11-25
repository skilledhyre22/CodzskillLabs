
import { useEffect, useState } from "react";
import type { TrainerResponse } from "../../shared/types";
import { getAllTrainers } from "../../shared/services/trainerService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GetAllTrainers = () => {
  const [trainers, setTrainers] = useState<TrainerResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Only users with Trainer role
  const filteredTrainers = trainers.filter(
    (trainer) => trainer.role === "Trainer"
  );

  const fetchAllTrainers = async () => {
    setLoading(true);

    const response = await getAllTrainers();

    if (response.isSuccess) {
      setTrainers(response.data);
    } else {
      toast.error(
        response.problemDetails?.title || "Failed to fetch trainers"
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAllTrainers();
  }, []);

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            Trainer Management
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            View and manage all assigned trainers.
          </p>
        </div>

        <span className="w-fit rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
          {filteredTrainers.length} Trainers
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading trainers...
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredTrainers.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
            👨‍🏫
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-800">
            No Trainers Found
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            No trainer role has been assigned yet. Once a Candidate is assigned
            the Trainer role, their profile will appear here.
          </p>
        </div>
      )}

      {/* Trainer Cards */}
      {!loading && filteredTrainers.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredTrainers.map((trainer) => (
            <div
              key={trainer.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xl font-bold text-white shadow-sm">
                  {trainer.fullName.charAt(0).toUpperCase()}
                </div>

                <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  {trainer.role}
                </span>
              </div>

              {/* Name */}
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Full Name
                </p>
                <h3 className="mt-1 truncate text-lg font-bold text-slate-800">
                  {trainer.fullName}
                </h3>
              </div>

              {/* Email */}
              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Email Address
                </p>
                <p className="mt-1 break-all text-sm text-slate-600">
                  {trainer.email}
                </p>
              </div>

              <div className="my-5 border-t border-slate-100" />

              {/* Trainer Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Primary Skill
                  </p>
                  <p className="mt-2 break-words text-sm font-bold text-slate-800">
                    {trainer.primarySkill}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Experience
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-800">
                    {trainer.yearsOfExperience} Years
                  </p>
                </div>
              </div>

              {/* Joined Date */}
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Joined Date
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {new Date(trainer.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Action */}
              <button
                type="button"
                onClick={() => navigate(`/trainer/${trainer.id}`)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
              >
                View Details
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllTrainers;
