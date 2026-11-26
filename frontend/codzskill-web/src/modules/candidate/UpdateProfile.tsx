
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { UserUpdateRequest } from "../../shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserProfileSchema } from "../../shared/types/schema/auth/UpdateUserProfileSchema";
import { myProfile, updateMyProfile } from "../../shared/services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<UserUpdateRequest>({
    resolver: zodResolver(UpdateUserProfileSchema)
  });

  useEffect(() => {
    const fetchProfile = async () => {
      
        const response = await myProfile();

        if (response.isSuccess && response.data) {
          reset({
            firstName: response.data.firstName,
            lastName: response.data.lastName
          });
        
      } 
        toast.error(response.problemDetails?.title);
      
    };

    fetchProfile();
  }, [reset]);

  const submit = async (model: UserUpdateRequest) => {
  
      const response = await updateMyProfile(model);

      if (response.isSuccess) {
        toast.success(response.message || "Profile updated successfully.");
        navigate("/candidate-profile");
      } else {
        toast.error(
          response.problemDetails?.title || "Profile update failed."
        );
      }  
      }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Update Profile
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Update your personal information.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <form onSubmit={handleSubmit(submit)} className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-slate-700">
                First Name
              </label>

              <input
                type="text"
                {...register("firstName")}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-violet-500"
                placeholder="Enter first name"
              />

              {errors.firstName && (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Last Name
              </label>

              <input
                type="text"
                {...register("lastName")}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-violet-500"
                placeholder="Enter last name"
              />

              {errors.lastName && (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="flex gap-3 border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={() => navigate("/candidate-profile")}
                className="w-full rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Updating..." : "Save Changes"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
