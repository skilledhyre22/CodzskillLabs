
import { useForm } from "react-hook-form";
import type { SignUpRequest } from "../../shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../../shared/types/schema/SignUpSchema";
import { signUp } from "../../shared/services/authService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../shared/components/common/Logo";
import { Button } from "../../shared/components/common/Button";


export const RegisterPage: React.FC = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting }
  } = useForm<SignUpRequest>({
    resolver: zodResolver(SignUpSchema)
  });

  const submit = async (model: SignUpRequest) => {
    
      const response = await signUp(model);

      if (response.isSuccess) {
        toast.success(response.message);
        navigate("/login");
      }
      else {
        toast.error(response?.problemDetails?.title);
      }
    
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

        <div className="mb-6 flex justify-center">
          <Logo theme="light" />
        </div>

        <h1 className="text-center text-2xl font-bold text-slate-900">
          Register as Learner
        </h1>

        <p className="mt-1 text-center text-sm text-slate-500">
          Access live classes, coding labs and verified certifications.
        </p>

        <form onSubmit={handleSubmit(submit)} className="mt-6 space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              {...register("firstName")}
              placeholder="Priya Sharma"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
            />

            {errors.firstName && (
              <p className="mt-1 text-xs text-rose-600">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Last Name
            </label>

            <input
              type="text"
              {...register("lastName")}
              placeholder="Sharma"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
            />

            {errors.lastName && (
              <p className="mt-1 text-xs text-rose-600">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              {...register("email")}
              placeholder="name@example.com"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
            />

            {errors.email && (
              <p className="mt-1 text-xs text-rose-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              {...register("password")}
              placeholder="Minimum 8 characters"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
            />

            {errors.password && (
              <p className="mt-1 text-xs text-rose-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            loading={isSubmitting}
            className="w-full"
            size="lg"
          >
            Create Learner Account
          </Button>

        </form>

        <div className="mt-5 flex justify-end text-xs text-slate-500">
          <Link to="/login" className="text-violet-600 hover:underline">
            Already registered? Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
