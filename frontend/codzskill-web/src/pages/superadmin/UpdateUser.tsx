
import { useForm } from "react-hook-form";
import type { SuperAdminUpdateRequest } from "../../shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserProfileSchema } from "../../shared/types/schema/auth/UpdateUserProfileSchema";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById,  updateUser } from "../../shared/services/userService";
import { toast } from "react-toastify";
import { useEffect } from "react";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate=useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SuperAdminUpdateRequest>({
    resolver: zodResolver(UpdateUserProfileSchema),
  });

  const fetchById = async () => {
    const response = await getUserById(id as string);

    if (response.isSuccess) {
      reset({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
      });
    } else {
      toast.error(response.problemDetails?.title);
    }
  };

  const submit = async (model: SuperAdminUpdateRequest) => {
    const response = await updateUser(id as string, model);

    if (response.isSuccess) {
      toast.success(response.message);
      navigate("/superadmin-dashboardPage")
    } else {
      toast.error(response.problemDetails?.title);
    }
  };
 


  useEffect(() => {
    fetchById();
  }, []);

  return (
    <div className="mx-auto max-w-xl p-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Update User
        </h2>

        <p className="mb-6 text-sm text-gray-500">
          Update the user's personal information.
        </p>

        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              First Name
            </label>

            <input
              type="text"
              {...register("firstName")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              placeholder="Enter first name"
            />

            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Last Name
            </label>

            <input
              type="text"
              {...register("lastName")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              placeholder="Enter last name"
            />

            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Updating..." : "Update User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
