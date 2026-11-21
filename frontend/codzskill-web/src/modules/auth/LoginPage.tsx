
import { Link, useNavigate } from 'react-router-dom';

import { Logo } from '../../shared/components/common/Logo';
import { Button } from '../../shared/components/common/Button';
import { authToken } from '../../shared/api/axiosInstance';
import { login, googleLogin } from '../../shared/services/authService';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import type { LoginRequest } from '../../shared/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../shared/types/schema/LoginSchema';
import { GoogleLogin } from '@react-oauth/google';

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema)
  });

  const navigate = useNavigate();

  const handleRoleNavigation = (roles: string[]) => {
    const userRoles = roles.map(role => role.toLowerCase());

    if (userRoles.includes('candidate')) {
      navigate('/learner-dashboardPage');
    } else if (userRoles.includes('trainer')) {
      navigate('/trainer-dashboard');
    } else if (userRoles.includes('superadmin')) {
      navigate('/superadmin-dashboardPage');
    } else {
      toast.error('No dashboard assigned to your role.');
    }
  };

  const submit = async (model: LoginRequest) => {
    const response = await login(model);

    if (response.isSuccess && response.data) {
      localStorage.setItem(authToken, response.data.token);

      toast.success(response.message);
      handleRoleNavigation(response.data.roles);
    } else {
      toast.error(response.problemDetails?.title || 'Login failed.');
    }
  };

  const handleGoogleLogin = async (credential: string) => {
    const response = await googleLogin({
      idToken: credential
    });

    if (response.isSuccess && response.data) {
      localStorage.setItem(authToken, response.data.token);

      toast.success(response.message);
      handleRoleNavigation(response.data.roles);
    } else {
      toast.error(response.problemDetails?.title || 'Google login failed.');
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <Logo theme="light" />
        </div>

        <h1 className="text-center text-2xl font-bold text-slate-900">
          Sign in to CodzSkill Labs
        </h1>

        <form onSubmit={handleSubmit(submit)} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              {...register('email')}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
            />

            {errors.email && (
              <p className="mt-1 text-xs font-medium text-rose-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              {...register('password')}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
            />

            {errors.password && (
              <p className="mt-1 text-xs font-medium text-rose-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
            className="w-full"
            size="lg"
          >
            Login
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400">OR</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                handleGoogleLogin(credentialResponse.credential);
              }
            }}
            onError={() => toast.error('Google authentication failed.')}
          />
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          New to CodzSkill Labs?{' '}
          <Link
            to="/register"
            className="font-semibold text-violet-600 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};
