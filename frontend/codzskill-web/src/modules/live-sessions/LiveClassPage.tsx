
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Maximize2,
  Mic,
  MicOff,
  MonitorUp,
  MoreHorizontal,
  Users,
  Video,
  VideoOff,
} from 'lucide-react';

import { CodeEditorPane } from '../../shared/components/live/CodeEditorPane';
import { LiveSidebar } from '../../../src/shared/components/live/LiveSlideBar';
import {
  INITIAL_LIVE_CHAT,
  INITIAL_LIVE_CODE,
} from '../../shared/services/mockData';
import { PLATFORM_MEDIA } from '../../assets';
import type { ChatMessage } from '../../shared/types';

export const LiveClassPage: React.FC = () => {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [screenShare, setScreenShare] = useState(true);
  const [code, setCode] = useState(INITIAL_LIVE_CODE);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_LIVE_CHAT);
  const [secondsElapsed, setSecondsElapsed] = useState(4356);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((s) => s + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec: number) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, '0');
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');

    return `${h}:${m}:${s}`;
  };

  const handleSendMessage = (text: string) => {
    const now = new Date();

    const formattedTime = now.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });

    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        sender: 'You',
        role: 'Learner',
        time: formattedTime,
        text,
      },
    ]);
  };

  const videoParticipants = [
    {
      name: 'Rahul Verma (Trainer)',
      img: PLATFORM_MEDIA.rahulAvatar,
      isTrainer: true,
    },
    {
      name: 'Priya',
      img: PLATFORM_MEDIA.priyaAvatar,
      isTrainer: false,
    },
    {
      name: 'Amit',
      img: PLATFORM_MEDIA.amitAvatar,
      isTrainer: false,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#0D1020] text-white">
      {/* Top Bar */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#13172B] px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            to="/learner/dashboard"
            className="rounded-lg p-1.5 text-slate-300 hover:bg-white/10"
            title="Back to Dashboard"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <h1 className="text-sm sm:text-base font-bold">
            Live Class: ASP.NET Core – Building Web APIs
          </h1>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 px-2.5 py-0.5 font-bold uppercase tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            LIVE
          </span>

          <span className="inline-flex items-center gap-1 text-slate-300">
            <Users className="h-4 w-4" /> 42
          </span>

          <span className="font-mono text-slate-300">
            {formatTimer(secondsElapsed)}
          </span>

          <button
            className="hidden sm:inline-flex rounded-lg p-1.5 text-slate-300 hover:bg-white/10"
            aria-label="Fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Main 3-Column Classroom Grid */}
      <div className="grid flex-1 gap-4 p-4 lg:grid-cols-12">
        {/* Left Video Column */}
        <div className="grid grid-cols-3 gap-3 lg:col-span-3 lg:grid-cols-1 lg:grid-rows-3">
          {videoParticipants.map((p) => (
            <div
              key={p.name}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1B2034]"
            >
              <img
                src={p.img}
                alt={p.name}
                className="h-32 sm:h-40 lg:h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
                <Mic className="h-3 w-3 text-emerald-400" />
                <span>{p.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Center Live Code Editor */}
        <div className="min-h-[380px] lg:col-span-6">
          <CodeEditorPane code={code} onChange={setCode} />
        </div>

        {/* Right Chat / Q&A / People Sidebar */}
        <div className="min-h-[360px] lg:col-span-3">
          <LiveSidebar
            messages={messages}
            onSendMessage={handleSendMessage}
            participantCount={42}
          />
        </div>
      </div>

      {/* Bottom Controls */}
      <footer className="flex items-center justify-center gap-3 border-t border-white/10 bg-[#13172B] px-4 py-3">
        <button
          onClick={() => setMicOn((v) => !v)}
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
            micOn
              ? 'border-white/15 bg-white/10 text-white hover:bg-white/20'
              : 'border-rose-500 bg-rose-600 text-white'
          }`}
          title={micOn ? 'Mute Mic' : 'Unmute Mic'}
        >
          {micOn ? (
            <Mic className="h-4 w-4" />
          ) : (
            <MicOff className="h-4 w-4" />
          )}
        </button>

        <button
          onClick={() => setCamOn((v) => !v)}
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
            camOn
              ? 'border-white/15 bg-white/10 text-white hover:bg-white/20'
              : 'border-rose-500 bg-rose-600 text-white'
          }`}
          title={camOn ? 'Turn Camera Off' : 'Turn Camera On'}
        >
          {camOn ? (
            <Video className="h-4 w-4" />
          ) : (
            <VideoOff className="h-4 w-4" />
          )}
        </button>

        <button
          onClick={() => setScreenShare((v) => !v)}
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
            screenShare
              ? 'border-violet-400 bg-violet-600 text-white'
              : 'border-white/15 bg-white/10 text-white hover:bg-white/20'
          }`}
          title="Share Screen"
        >
          <MonitorUp className="h-4 w-4" />
        </button>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20"
          title="More options"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>

        <button
          onClick={() => navigate('/learner/dashboard')}
          className="ml-3 rounded-xl bg-rose-600 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-500"
        >
          Leave
        </button>
      </footer>
    </div>
  );
};
