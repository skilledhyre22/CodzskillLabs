
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Logo } from '../../shared/components/common/Logo';
import { Button } from '../../shared/components/common/Button';
import { useAuth } from '../../app/providers/AuthProvider';
import { isValidEmail, minLength } from '../../shared/utilis/validators';

export const RegisterPage: React.FC = () => {
  const { role: roleParam } = useParams<{ role: string }>();
  const role: 'Learner' | 'Trainer' =
    roleParam?.toLowerCase() === 'trainer' ? 'Trainer' : 'Learner';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [expertise, setExpertise] = useState('');
  const [experienceYears, setExperienceYears] = useState('3');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!minLength(fullName, 2)) {
      setError('Please enter your full name.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!minLength(password, 6)) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await register({
        fullName,
        email,
        password,
        role,
        expertise: role === 'Trainer' ? expertise : undefined,
        experienceYears: role === 'Trainer' ? Number(experienceYears) : undefined,
      });
      navigate(role === 'Trainer' ? '/trainer/dashboard' : '/learner/dashboard');
    } catch {
      setError('Unable to complete registration. Please try again.');
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
          Register as {role}
        </h1>
        <p className="mt-1 text-center text-sm text-slate-500">
          {role === 'Trainer'
            ? 'Share your industry expertise and launch live cohorts.'
            : 'Access live classes, coding labs and verified certifications.'}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={role === 'Trainer' ? 'Rahul Verma' : 'Priya Sharma'}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
            />
          </div>

          {role === 'Trainer' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Primary Skill
                </label>
                <input
                  type="text"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  placeholder="ASP.NET Core, AI"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Years Exp.
                </label>
                <input
                  type="number"
                  min={1}
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
              {error}
            </div>
          )}

          <Button type="submit" loading={loading} className="w-full" size="lg">
            Create {role} Account
          </Button>
        </form>

        <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
          <Link
            to={role === 'Trainer' ? '/register/learner' : '/register/trainer'}
            className="text-violet-600 hover:underline"
          >
            Switch to {role === 'Trainer' ? 'Learner' : 'Trainer'} Signup
          </Link>
          <Link to="/login" className="text-violet-600 hover:underline">
            Already registered? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
