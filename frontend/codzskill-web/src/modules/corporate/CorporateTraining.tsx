
import React, { useRef, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Layers,
  Laptop,
  UserCheck,
} from 'lucide-react';
import { Card } from '../../shared/components/common/Card';
import { Button } from '../../shared/components/common/Button';
import { PLATFORM_MEDIA } from '../../assets';
import { corporateService } from '../../shared/services/corporateService';
import { isValidEmail, minLength } from '../../shared/utilis/validators';

export const CorporateTrainingPage: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [teamSize, setTeamSize] = useState('25-50');
  const [focusArea, setFocusArea] = useState('ASP.NET Core & Cloud Architecture');
  const [deliveryMode, setDeliveryMode] = useState<'Online' | 'On-site' | 'Hybrid'>('Hybrid');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const pillars = [
    {
      icon: <Layers className="h-5 w-5 text-violet-600" />,
      title: 'Custom Programs',
      desc: 'Tailored to your business goals',
    },
    {
      icon: <UserCheck className="h-5 w-5 text-violet-600" />,
      title: 'Expert Trainers',
      desc: 'Industry practitioners',
    },
    {
      icon: <Laptop className="h-5 w-5 text-violet-600" />,
      title: 'Flexible Delivery',
      desc: 'Online, on-site or hybrid',
    },
    {
      icon: <BarChart3 className="h-5 w-5 text-violet-600" />,
      title: 'Measurable Impact',
      desc: 'Assessments & reports',
    },
  ];

  const tracks = [
    {
      title: 'Enterprise .NET 10 & Microservices',
      duration: '4–8 Weeks',
      description: 'Modernize legacy .NET apps to Clean Architecture, EF Core, and Azure Kubernetes.',
    },
    {
      title: 'Full-Stack React & TypeScript Engineering',
      duration: '4 Weeks',
      description: 'Accelerate frontend velocity with reusable design systems and automated testing.',
    },
    {
      title: 'Generative AI & Copilots for Teams',
      duration: '3 Weeks',
      description: 'Build secure RAG systems, Semantic Kernel integrations, and LLM workflows.',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!minLength(companyName, 2) || !minLength(contactName, 2)) {
      setError('Please enter your company name and full name.');
      return;
    }
    if (!isValidEmail(workEmail)) {
      setError('Please enter a valid work email address.');
      return;
    }

    setError('');
    setSubmitting(true);
    try {
      const res = await corporateService.submitProposal({
        companyName,
        contactName,
        workEmail,
        teamSize,
        focusArea,
        deliveryMode,
        notes,
      });
      setSuccessMessage(`${res.message} (Reference: ${res.referenceId})`);
      setCompanyName('');
      setContactName('');
      setWorkEmail('');
      setNotes('');
    } catch {
      setError('Failed to submit proposal request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50">
      {/* Hero Banner matching screenshot */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-violet-50/50 to-indigo-100/60 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                Corporate Training
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl">
                Upskill your teams with customized, industry-focused training programs.
              </p>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 pt-2">
                {pillars.map((p) => (
                  <div
                    key={p.title}
                    className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50">
                      {p.icon}
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-slate-900">{p.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">{p.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button size="lg" onClick={scrollToForm}>
                  Request a Proposal <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={scrollToForm}>
                  Talk to an Expert
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-violet-200 bg-white p-2 shadow-xl">
                <img
                  src={PLATFORM_MEDIA.corporateTeam}
                  alt="Corporate team training session"
                  className="h-80 w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Training Programs */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Popular Enterprise Training Tracks
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {tracks.map((track) => (
            <Card key={track.title} className="p-6 flex flex-col justify-between">
              <div>
                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                  {track.duration}
                </span>
                <h3 className="mt-3 text-lg font-bold text-slate-900">{track.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{track.description}</p>
              </div>
              <button
                onClick={() => {
                  setFocusArea(track.title);
                  scrollToForm();
                }}
                className="mt-5 text-left text-xs font-semibold text-violet-600 hover:underline"
              >
                Select this track &rarr;
              </button>
            </Card>
          ))}
        </div>
      </section>

      {/* Request Proposal Form */}
      <section ref={formRef} className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <Card className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Request a Corporate Training Proposal
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Share your team goals and our curriculum architects will craft a custom plan.
          </p>

          {successMessage && (
            <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Company Name *
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Technologies"
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Your Name *
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Engineering Manager"
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Work Email *
              </label>
              <input
                type="email"
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                placeholder="you@company.com"
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Team Size
              </label>
              <select
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
              >
                <option value="10-25">10–25 Engineers</option>
                <option value="25-50">25–50 Engineers</option>
                <option value="50-150">50–150 Engineers</option>
                <option value="150+">150+ Engineers</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Primary Technology Track
              </label>
              <input
                type="text"
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Delivery Mode
              </label>
              <select
                value={deliveryMode}
                onChange={(e) =>
                  setDeliveryMode(e.target.value as 'Online' | 'On-site' | 'Hybrid')
                }
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
              >
                <option value="Online">Online Live</option>
                <option value="On-site">On-site Workshop</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">
                Training Goals &amp; Timeline
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell us about your current tech stack and upskilling timeline..."
                className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-violet-500 focus:outline-none"
              />
            </div>

            {error && (
              <div className="sm:col-span-2 rounded-xl bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
                {error}
              </div>
            )}

            <div className="sm:col-span-2">
              <Button type="submit" size="lg" loading={submitting}>
                Submit Proposal Request <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </div>
  );
};
