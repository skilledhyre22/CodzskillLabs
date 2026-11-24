
import { useEffect, useState } from "react";
import type { TrainerResponse } from "..";
import { getPendingApplications } from "../../services/trainerService";
// import UpdateTrainerStatus from "./UpdateTrainerStatus";

const GetPendingApplication = () => {
  const [trainers, setTrainers] = useState<TrainerResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchApplications = async () => {
    setLoading(true);

    const response = await getPendingApplications();

    if (response.isSuccess) {
      setTrainers(response.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Trainer Applications
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Review and manage trainer applications.
          </p>
        </div>

        <span className="w-fit rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
          {/* {trainers.length} Pending Applications */}
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <p className="py-10 text-center text-slate-500">
          Loading applications...
        </p>
      )}

      {/* Empty State */}
      {!loading && trainers.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h3 className="font-semibold text-slate-700">
            No Pending Applications
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            New trainer applications will appear here.
          </p>
        </div>
      )}

      {/* Trainer Cards */}
      {!loading && trainers.length > 0 && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-lg font-bold text-purple-700">
                    {trainer.fullName.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">
                      {trainer.fullName}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {trainer.email}
                    </p>
                  </div>
                </div>

                {/* <span className="shrink-0 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                  {trainer.status === 1
                    ? "Pending"
                    : trainer.status === 2
                    ? "Approved"
                    : "Rejected"}
                </span> */}
              </div>

              <div className="my-5 border-t border-slate-100" />

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Primary Skill
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {trainer.primarySkill}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Experience
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {trainer.yearsOfExperience} Years
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-xs font-medium text-slate-500">
                    Applied Date
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {new Date(trainer.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="my-5 border-t border-slate-100" />

              {/* Actions */}
              {/* Actions */}
{/* <UpdateTrainerStatus
  id={trainer.id}
  currentStatus={trainer.status}
  onUpdated={fetchApplications}
/> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetPendingApplication;
