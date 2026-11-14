
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Presentation } from 'lucide-react';
import { Logo } from '../../shared/components/common/Logo';

export const JoinPage: React.FC = () => {
  return (
    <div className="min-h-[82vh] bg-gradient-to-b from-violet-50/80 via-slate-50 to-white px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8 flex justify-center">
          <Logo theme="light" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Join Codzskill Labs
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Create your account and start your learning or training journey.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-violet-300 hover:shadow-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <GraduationCap className="h-9 w-9" />
            </div>
            <h2 className="mt-5 text-xl font-bold text-slate-900">I&apos;m a Learner</h2>
            <p className="mt-2 text-sm text-slate-600">
              Learn new skills, join live classes, work on projects and get certified.
            </p>
            <Link
              to="/register/learner"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-violet-600/25 hover:from-violet-500 hover:to-indigo-500"
            >
              Register as Learner <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-violet-300 hover:shadow-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
              <Presentation className="h-9 w-9" />
            </div>
            <h2 className="mt-5 text-xl font-bold text-slate-900">I&apos;m a Trainer</h2>
            <p className="mt-2 text-sm text-slate-600">
              Teach, create courses, run cohorts and grow your earnings.
            </p>
            <Link
              to="/register/trainer"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:border-violet-400 hover:bg-violet-50"
            >
              Register as Trainer <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <p className="mt-8 text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-violet-600 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default JoinPage;
