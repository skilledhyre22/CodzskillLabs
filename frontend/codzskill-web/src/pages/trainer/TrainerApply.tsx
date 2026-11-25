
import { useForm } from "react-hook-form";
import type { TrainerRequest } from "../../shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrainerApplySchema } from "../../shared/types/schema/trainer/TrainerApplySchema";
import { trainerRegistration } from "../../shared/services/trainerService";
import { toast } from "react-toastify";

const TrainerApply = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrainerRequest>({
    resolver: zodResolver(TrainerApplySchema),
  });

  const submit = async (model: TrainerRequest) => {
   
      const response = await trainerRegistration(model);

      if (response.isSuccess) {
        toast.success(response.message);
      } else {
        toast.error(response.problemDetails?.title);
      }
    
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100";

  const errorClass = "mt-1 text-xs text-red-500";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white px-7 py-8 shadow-lg sm:px-8">

        {/* Logo */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600 text-white shadow-md">
            <span className="font-bold">&lt;+&gt;</span>
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            Codzskill <span className="text-purple-600">Labs</span>
          </h2>
        </div>

        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Register as Trainer
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Share your industry expertise and launch live cohorts.
          </p>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-800">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter Name"
              {...register("fullName")}
              className={inputClass}
            />

            {errors.fullName && (
              <p className={errorClass}>{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-800">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter Email"
              {...register("email")}
              className={inputClass}
            />

            {errors.email && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>

          {/* Primary Skill and Experience */}
          <div className="grid grid-cols-2 gap-3">

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-800">
                Primary Skill
              </label>

              <input
                type="text"
                placeholder=""
                {...register("primarySkill")}
                className={inputClass}
              />

              {errors.primarySkill && (
                <p className={errorClass}>
                  {errors.primarySkill.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-800">
                Years Exp.
              </label>

              <input
                type="number"
                placeholder=""
                {...register("yearsOfExperience", {
                  valueAsNumber: true,
                })}
                className={inputClass}
              />

              {errors.yearsOfExperience && (
                <p className={errorClass}>
                  {errors.yearsOfExperience.message}
                </p>
              )}
            </div>

          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-800">
              Password
            </label>

            <input
              type="password"
              placeholder="Minimum 6 characters"
              {...register("password")}
              className={inputClass}
            />

            {errors.password && (
              <p className={errorClass}>{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating Account..." : "Create Trainer Account"}
          </button>

        </form>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between text-xs">
          <a
            href="/register"
            className="text-purple-600 hover:underline"
          >
            Switch to Learner Signup
          </a>

          <a
            href="/login"
            className="text-purple-600 hover:underline"
          >
            Already registered? Login
          </a>
        </div>

      </div>
    </div>
  );
};

export default TrainerApply;
