import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { TrainerUpdateRequest } from "../../shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrainerUpdateSchema } from "../../shared/types/schema/trainer/TrainerApplySchema";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTrainerById,
  updateTrainer,
} from "../../shared/services/trainerService";
import { toast } from "react-toastify";

const UpdateTrainerDetails = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TrainerUpdateRequest>({
    resolver: zodResolver(TrainerUpdateSchema),
  });

  const fetchById = async () => {
    if (!id) {
      toast.error("Trainer ID not found");
      setLoading(false);
      return;
    }

    const response = await getTrainerById(id);

    if (response.isSuccess) {
      reset({
        id: response.data.id,
        primarySkill: response.data.primarySkill,
        yearsOfExperience: response.data.yearsOfExperience,
      });
    } else {
      toast.error(
        response.problemDetails?.title || "Failed to fetch trainer details"
      );
    }

    setLoading(false);
  };

  const submit = async (model: TrainerUpdateRequest) => {
    const response = await updateTrainer(model);

    if (response.isSuccess) {
      toast.success(response.message || "Trainer details updated successfully");
      navigate(`/trainer/${model.id}`);
    } else {
      toast.error(
        response.problemDetails?.title || "Failed to update trainer details"
      );
    }
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

  return (
    <div className="mx-auto max-w-2xl space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Update Trainer Profile
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Update trainer skills and professional experience.
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit(submit)} className="space-y-6">

          {/* Primary Skill */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Primary Skill
            </label>

            <input
              type="text"
              placeholder="Enter primary skill"
              {...register("primarySkill")}
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${
                errors.primarySkill
                  ? "border-red-400"
                  : "border-slate-200"
              }`}
            />

            {errors.primarySkill && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.primarySkill.message}
              </p>
            )}
          </div>

          {/* Years of Experience */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Years of Experience
            </label>

            <input
              type="number"
              min="0"
              placeholder="Enter years of experience"
              {...register("yearsOfExperience", {
                valueAsNumber: true,
              })}
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${
                errors.yearsOfExperience
                  ? "border-red-400"
                  : "border-slate-200"
              }`}
            />

            {errors.yearsOfExperience && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {errors.yearsOfExperience.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTrainerDetails;