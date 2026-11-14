
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#070B19] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <Logo theme="dark" />
            <p className="text-sm leading-relaxed text-slate-400">
              A global learning and trainer marketplace for technology, professional, and industry skills.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Platform</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/courses" className="hover:text-violet-300">Explore Courses</Link></li>
              <li><Link to="/cohorts/aspnet-core-full-stack-cohort" className="hover:text-violet-300">Live Cohorts</Link></li>
              <li><Link to="/live-class" className="hover:text-violet-300">Hands-on Live Labs</Link></li>
              <li><Link to="/corporate" className="hover:text-violet-300">Corporate Training</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Dashboards</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/learner/dashboard" className="hover:text-violet-300">Learner Dashboard</Link></li>
              <li><Link to="/trainer/dashboard" className="hover:text-violet-300">Trainer Dashboard</Link></li>
              <li><Link to="/register/trainer" className="hover:text-violet-300">Join as a Trainer</Link></li>
              <li><Link to="/register/learner" className="hover:text-violet-300">Register as Learner</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Enterprise Ready</h4>
            <p className="mt-4 text-sm text-slate-400">
              Powered by ASP.NET Core 10 & React architecture for high-scale enterprise cohorts.
            </p>
            <Link
              to="/corporate"
              className="mt-4 inline-block rounded-lg border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-xs font-semibold text-violet-300 hover:bg-violet-500/20"
            >
              Request Enterprise Proposal &rarr;
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row">
          <p>&copy; {new Date().getFullYear()} CodzSkill Labs. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/courses" className="hover:text-white">Privacy Policy</Link>
            <Link to="/courses" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
