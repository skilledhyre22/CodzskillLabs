
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../app/providers/AuthProvider';
import { Logo } from '../../shared/components/common/Logo';
import { Button } from '../../shared/components/common/Button';
import { isValidEmail, minLength } from '../../shared/utilis/validators';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('priya.sharma@codzskill.dev');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError('Enter a valid email address.');
      return;
    }

    if (!minLength(password, 6)) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const auth = await login({ email, password });

      navigate(
        auth.user.role === 'Trainer'
          ? '/trainer/dashboard'
          : '/learner/dashboard'
      );
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
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

        <p className="mt-1 text-center text-xs text-slate-500">
          Tip: Use any email with &quot;trainer&quot; to preview Trainer Dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
              {error}
            </div>
          )}

          <Button type="submit" loading={loading} className="w-full" size="lg">
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          New to CodzSkill Labs?{' '}
          <Link
            to="/join"
            className="font-semibold text-violet-600 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};
